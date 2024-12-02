
export type VagaProps = {
    id: number;
    title: String;
    date: String;
    description: String;
    phone: String;
    company: String;
    status: String;
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Auth: undefined;
    Home: undefined;
    Profile: undefined;
    Details: { id: string };
  };
  
  export type HomeStackParamList = {
    List: undefined;
    Details: { id: string };
  };
  
  export type TabParamList = {
    Home: undefined;
    Profile: undefined;
  };
  