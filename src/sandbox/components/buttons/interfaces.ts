type ButtonAction = () => void;

export interface ButtonProps {
  label: string;
  action: ButtonAction;
  isLoading?: boolean;
}

export interface ConnectButtonProps {

}