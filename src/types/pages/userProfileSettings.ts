
export interface IPrivateDataFrom {
  nickname: string;
  gender: TGender;
  country: string;
  email: string;
}

type TGender = "male" | "female";