import { BaseModel } from "../base.model";

export class Aplication extends BaseModel {
  username!: string;
  discordName!: string;
  age!: number;
  mute!: boolean;
  lenguajes!: string;
  hasHeadset!: boolean;
  gpuModel!: string;
  hasAnotherCommunity!: boolean;
  communitys?: string;
  hasRoleExperencie!: boolean;
  roleplayExperencie?: string;
  skills!: string;
  isOldMember!: boolean;
  oldMember?: string;
  reason!: string;
  foundUs!: string;
  undestoodRules!: boolean;

  public static getProperties(): string[] {
    const instance = new Aplication();
    instance.username = '';
    instance.discordName = '';
    instance.age = 0;
    instance.mute = false;
    instance.lenguajes = "";
    instance.hasHeadset = false;
    instance.gpuModel = '';
    instance.hasAnotherCommunity = false;
    instance.hasRoleExperencie = false;
    instance.skills = '';
    instance.isOldMember = false;
    instance.reason = '';
    instance.foundUs = '';
    instance.undestoodRules = false;

    return Object.keys(instance);
  }
}

export class Community {
  communitys?: Array<string>;
}