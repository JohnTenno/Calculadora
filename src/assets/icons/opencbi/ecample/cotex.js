const WebSocket = require('ws');
const https = require('https');

class Cortex {
    constructor(user, socketUrl) {
        const agent = new https.Agent({ rejectUnauthorized: false });
        this.socket = new WebSocket(socketUrl, { agent });
        this.user = user;
        this.isHeadsetConnected = false;
        this.authToken = null;
        this.sessionId = null;
        this.headsetId = null;

        // Configurar listeners básicos
        this.socket.on('open', () => {
            console.log('✅ Conexión WebSocket establecida');
            this.initializeConnection();
        });

        this.socket.on('error', (err) => {
            console.error('WebSocket error:', err);
        });
    }

    async initializeConnection() {
        try {
            // 1. Solicitar acceso
            await this.requestAccess();
            
            // 2. Autorizar y obtener token
            this.authToken = await this.authorize();
            
            // 3. Buscar y conectar headset
            const headsets = await this.queryHeadsetId();
            if (headsets.result.length === 0) {
                throw new Error('No se encontraron headsets. Conecta un dispositivo EPOC+ y reintenta.');
            }
            
            this.headsetId = headsets.result[0].id;
            await this.controlDevice(this.headsetId);
            
            // 4. Crear sesión
            this.sessionId = await this.createSession(this.authToken, this.headsetId);
            
            // 5. Suscribirse a EEG
            this.subscribeToEEG();
            
        } catch (error) {
            console.error('Error en inicialización:', error.message);
        }
    }

    async requestAccess() {
        return new Promise((resolve) => {
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
                const response = JSON.parse(data);
                if (response.id === requestId) {
                    this.socket.off('message', listener);
                    console.log('🔑 Acceso:', response.result.message);
                    resolve(response);
                }
            };

            this.socket.on('message', listener);
        });
    }

    async authorize() {
        return new Promise((resolve) => {
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
                const response = JSON.parse(data);
                if (response.id === requestId) {
                    this.socket.off('message', listener);
                    console.log('🛡️ Token de autorización obtenido');
                    resolve(response.result.cortexToken);
                }
            };

            this.socket.on('message', listener);
        });
    }

    async queryHeadsetId() {
        return new Promise((resolve) => {
            const requestId = 2;
            const request = {
                "jsonrpc": "2.0",
                "id": requestId,
                "method": "queryHeadsets",
                "params": {}
            };

            this.socket.send(JSON.stringify(request));
            
            const listener = (data) => {
                const response = JSON.parse(data);
                if (response.id === requestId) {
                    this.socket.off('message', listener);
                    console.log('🔍 Headsets encontrados:', response.result);
                    resolve(response);
                }
            };

            this.socket.on('message', listener);
        });
    }

    async controlDevice(headsetId) {
        return new Promise((resolve) => {
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
                const response = JSON.parse(data);
                if (response.id === requestId) {
                    this.socket.off('message', listener);
                    console.log('📌 Estado de conexión:', response.result.message);
                    resolve(response);
                }
            };

            this.socket.on('message', listener);
        });
    }

    async createSession(authToken, headsetId) {
        return new Promise((resolve) => {
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
                const response = JSON.parse(data);
                if (response.id === requestId) {
                    this.socket.off('message', listener);
                    console.log('🎮 Sesión creada con ID:', response.result.id);
                    resolve(response.result.id);
                }
            };

            this.socket.on('message', listener);
        });
    }

    subscribeToEEG() {
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
    }
}

// Configuración con tus credenciales
const USER = {
    clientId: "gxy2U5O7TTkyJQPyrWiOPDoFiKmOiDYWQKF8w9CI",
    clientSecret: "lHNAsWXsxTAnFEapGwKbFiY714sU9vtGgw3qky42avpNIIe82265POFLo5BCqivJfCQPZRfy1HnpxJJ5yqSL3A1pfqrfS20Vm8j4UlNpKpNx4yzgyNV3pIllOD88bIKN",
    license: "free",
    debit: 1
};

const SOCKET_URL = 'wss://localhost:6868';

// Iniciar conexión
const cortex = new Cortex(USER, SOCKET_URL);

// Manejar cierre limpio
process.on('SIGINT', () => {
    console.log('\nCerrando conexión...');
    cortex.socket.close();
    process.exit();
});