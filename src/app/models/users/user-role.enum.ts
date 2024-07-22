export enum UserRoleEnum {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  LEAD = "LEAD",
  EVALUATOR = "EVALUATOR",
  SUBACCOUNT = "SUBACCOUNT",
  QA = "QA",
  SELLER = "SELLER",
  PROGRAMMER = "PROGRAMMER",
}
export const UserRoles = <const>[
  "ADMIN",
  "CLIENT",
  "LEAD",
  "EVALUATOR",
  "SUBACCOUNT",
  "QA",
  "SELLER",
  "PROGRAMMER",
];
export type UserRoleType = typeof UserRoles[number];