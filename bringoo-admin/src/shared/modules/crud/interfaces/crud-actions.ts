export interface CrudActions {
  label: string;
  noSelectionDisable?: boolean;
  action: (setOfChecked: Set<string>) => void;
}
