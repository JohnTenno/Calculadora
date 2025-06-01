const WebSocket = require('ws');
const https = require('https');

class Cortex {
    constructor(user, socketUrl) {
        try {
            const agent = new https.Agent({ rejectUnauthorized: false });
            this.socket = new WebSocket(socketUrl, { agent });
            this.user = user;
            this.isHeadsetConnected = false;
            this.authToken = null;
            this.sessionId = null;
            this.headsetId = null;

            // Configurar listeners básicos
            this.socket.on('open', () => {
                try {
                    console.log('✅ Conexión WebSocket establecida');
                    this.initializeConnection();
                } catch (error) {
                    console.error('Error en evento open:', error);
                }
            });

            this.socket.on('error', (err) => {
                console.error('WebSocket error:', err);
            });

        } catch (error) {
            console.error('Error al inicializar Cortex:', error);
            throw error;
        }
    }

    async initializeConnection() {
        try {
            // 1. Solicitar acceso
            await this.requestAccess();
            
            // 2. Autorizar y obtener token
            this.authToken = await this.authorize();
            
            // 3. Buscar y conectar headset
            const headsets = await this.queryHeadsetId();
            if (!headsets || !headsets.result || headsets.result.length === 0) {
                throw new Error('No se encontraron headsets. Conecta un dispositivo EPOC+ y reintenta.');
            }
            
            this.headsetId = headsets.result[0].id;
            await this.controlDevice(this.headsetId);
            
            // 4. Crear sesión
            this.sessionId = await this.createSession(this.authToken, this.headsetId);
            
            // 5. Suscribirse a EEG
            this.subscribeToEEG();
            
        } catch (error) {
            console.error('❌ Error en inicialización:', error.message);
            throw error;
        }
    }

    async requestAccess() {
        return new Promise((resolve, reject) => {
            try {
                const requestId = 1;
                const request = {
                    "jsonrpc": "2.0",
                    "id": requestId,
                    "method": "requestAccess",
                    "params": {
                        "clientId": this.user.clientId,
                        "clientSecret": this.user.clientSecret
                    }
                };

                this.socket.send(JSON.stringify(request));
                
                const listener = (data) => {
                    try {
                        const response = JSON.parse(data);
                        if (response.id === requestId) {
                            this.socket.off('message', listener);
                            if (response.error) {
                                reject(new Error(response.error.message));
                            } else {
                                console.log('🔑 Acceso:', response.result.message);
                                resolve(response);
                            }
                        }
                    } catch (error) {
                        this.socket.off('message', listener);
                        reject(error);
                    }
                };

                this.socket.on('message', listener);

                // Timeout para evitar esperas infinitas
                setTimeout(() => {
                    this.socket.off('message', listener);
                    reject(new Error('Timeout al solicitar acceso'));
                }, 10000);

            } catch (error) {
                reject(error);
            }
        });
    }

    async authorize() {
        return new Promise((resolve, reject) => {
            try {
                const requestId = 4;
                const request = {
                    "jsonrpc": "2.0",
                    "id": requestId,
                    "method": "authorize",
                    "params": {
                        "clientId": this.user.clientId,
                        "clientSecret": this.user.clientSecret,
                        "license": this.user.license,
                        "debit": this.user.debit
                    }
                };

                this.socket.send(JSON.stringify(request));
                
                const listener = (data) => {
                    try {
                        const response = JSON.parse(data);
                        if (response.id === requestId) {
                            this.socket.off('message', listener);
                            if (response.error) {
                                console.error('❌ Error de autorización:', response.error.message);
                                reject(new Error(response.error.message));
                            } else if (!response.result?.cortexToken) {
                                const err = new Error('Estructura de respuesta inválida');
                                console.error('⚠️ Respuesta inesperada:', response);
                                reject(err);
                            } else {
                                console.log('🛡️ Token de autorización obtenido');
                                resolve(response.result.cortexToken);
                            }
                        }
                    } catch (error) {
                        this.socket.off('message', listener);
                        console.error('Error al procesar autorización:', error);
                        reject(error);
                    }
                };

                this.socket.on('message', listener);

                // Timeout
                setTimeout(() => {
                    this.socket.off('message', listener);
                    reject(new Error('Timeout al autorizar'));
                }, 10000);

            } catch (error) {
                reject(error);
            }
        });
    }

    async queryHeadsetId() {
        return new Promise((resolve, reject) => {
            try {
                const requestId = 2;
                const request = {
                    "jsonrpc": "2.0",
                    "id": requestId,
                    "method": "queryHeadsets",
                    "params": {}
                };

                this.socket.send(JSON.stringify(request));
                
                const listener = (data) => {
                    try {
                        const response = JSON.parse(data);
                        if (response.id === requestId) {
                            this.socket.off('message', listener);
                            if (response.error) {
                                reject(new Error(response.error.message));
                            } else {
                                console.log('🔍 Headsets encontrados:', response.result);
                                resolve(response);
                            }
                        }
                    } catch (error) {
                        this.socket.off('message', listener);
                        reject(error);
                    }
                };

                this.socket.on('message', listener);

                setTimeout(() => {
                    this.socket.off('message', listener);
                    reject(new Error('Timeout al buscar headsets'));
                }, 10000);

            } catch (error) {
                reject(error);
            }
        });
    }

    async controlDevice(headsetId) {
        return new Promise((resolve, reject) => {
            try {
                const requestId = 3;
                const request = {
                    "jsonrpc": "2.0",
                    "id": requestId,
                    "method": "controlDevice",
                    "params": {
                        "command": "connect",
                        "headset": headsetId
                    }
                };

                this.socket.send(JSON.stringify(request));
                console.log(`🔌 Conectando a headset ${headsetId}...`);
                
                const listener = (data) => {
                    try {
                        const response = JSON.parse(data);
                        if (response.id === requestId) {
                            this.socket.off('message', listener);
                            if (response.error) {
                                reject(new Error(response.error.message));
                            } else {
                                console.log('📌 Estado de conexión:', response.result.message);
                                resolve(response);
                            }
                        }
                    } catch (error) {
                        this.socket.off('message', listener);
                        reject(error);
                    }
                };

                this.socket.on('message', listener);

                setTimeout(() => {
                    this.socket.off('message', listener);
                    reject(new Error('Timeout al conectar headset'));
                }, 15000);

            } catch (error) {
                reject(error);
            }
        });
    }

    async createSession(authToken, headsetId) {
        return new Promise((resolve, reject) => {
            try {
                const requestId = 5;
                const request = {
                    "jsonrpc": "2.0",
                    "id": requestId,
                    "method": "createSession",
                    "params": {
                        "cortexToken": authToken,
                        "headset": headsetId,
                        "status": "active"
                    }
                };

                this.socket.send(JSON.stringify(request));
                
                const listener = (data) => {
                    try {
                        const response = JSON.parse(data);
                        if (response.id === requestId) {
                            this.socket.off('message', listener);
                            if (response.error) {
                                reject(new Error(response.error.message));
                            } else if (!response.result?.id) {
                                reject(new Error('No se recibió sessionId'));
                            } else {
                                console.log('🎮 Sesión creada con ID:', response.result.id);
                                resolve(response.result.id);
                            }
                        }
                    } catch (error) {
                        this.socket.off('message', listener);
                        reject(error);
                    }
                };

                this.socket.on('message', listener);

                setTimeout(() => {
                    this.socket.off('message', listener);
                    reject(new Error('Timeout al crear sesión'));
                }, 10000);

            } catch (error) {
                reject(error);
            }
        });
    }

    subscribeToEEG() {
        try {
            const request = {
                "jsonrpc": "2.0",
                "id": 6,
                "method": "subscribe",
                "params": {
                    "cortexToken": this.authToken,
                    "session": this.sessionId,
                    "streams": ["eeg"]
                }
            };

            this.socket.send(JSON.stringify(request));
            console.log('📡 Suscrito a datos EEG. Mostrando datos...');

            // Listener para datos EEG
            this.socket.on('message', (data) => {
                try {
                    const msg = JSON.parse(data);
                    if (msg.eeg) {
                        console.log('🧠 Datos EEG:', {
                            timestamp: msg.time,
                            electrodes: msg.eeg
                        });
                    }
                } catch (err) {
                    console.error('Error al procesar EEG:', err);
                }
            });

        } catch (error) {
            console.error('Error al suscribirse a EEG:', error);
            throw error;
        }
    }
}

// Uso con manejo de errores global
(async () => {
    try {
        const USER = {
            clientId: "gxy2U5O7TTkyJQPyrWiOPDoFiKmOiDYWQKF8w9CI",
            clientSecret: "lHNAsWXsxTAnFEapGwKbFiY714sU9vtGgw3qky42avpNIIe82265POFLo5BCqivJfCQPZRfy1HnpxJJ5yqSL3A1pfqrfS20Vm8j4UlNpKpNx4yzgyNV3pIllOD88bIKN",
            license: "free",
            debit: 1
        };

        const SOCKET_URL = 'wss://localhost:6868';
        const cortex = new Cortex(USER, SOCKET_URL);

        process.on('SIGINT', () => {
            console.log('\nCerrando conexión...');
            cortex.socket.close();
            process.exit();
        });

    } catch (error) {
        console.error('❌ Error fatal:', error);
        process.exit(1);
    }
})();