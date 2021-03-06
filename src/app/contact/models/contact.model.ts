import { selector } from "rxjs/operator/publish";

export interface Contact {
	CreatedBy: number;
	Created_Date: string;
	Con_Email1: string;
	Con_Email2: string;
	Con_Address: string;
	Con_Country: string;
	Con_State: string;
	Con_City: string;
	Con_Pincode: number;
	Con_CCode: number;
	Con_Phone: number;
	Con_MCode: number;
	Con_Mobile: number;
	Con_AMCode: number;
	Con_AMobile: number;
	Con_Title: string;
	Con_Name: string;
	Con_MName: string;
	Con_Surname: string;
	Con_Type: string;
	Con_DOB: string;
	Con_Ann_Date: string;
	Con_Company_Id: string;
	Con_Designation: string;
	Con_Department: string;
	Con_Linkedin: string;
	Con_Twitter: string;
	Con_Fb: string;
	Con_SkypeId: string;
}
