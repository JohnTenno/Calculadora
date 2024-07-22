export class BaseModel {
    _id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;
    deleted?: boolean;
    constructor(baseModel?: Partial<BaseModel>) {
        if (baseModel) {
            if (baseModel._id) this._id = baseModel._id;
            if (baseModel.createdAt) this.createdAt = baseModel.createdAt;
            if (baseModel.updatedAt) this.updatedAt = baseModel.updatedAt;
            if (baseModel.deletedAt) this.deletedAt = baseModel.deletedAt;
            if (baseModel.deleted) this.deleted = baseModel.deleted;
        }
    }
}

export type BaseModelFields = '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted';