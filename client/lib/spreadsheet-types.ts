export interface SpreadsheetRow {
  id: number;
  jobRequest: string;
  submitted: string;
  status: "In-process" | "Need to start" | "Complete" | "Blocked";
  submitter: string;
  url: string;
  assigned: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  estValue: number;
}

export interface ViewTab {
  id: string;
  label: string;
  count?: number;
  isActive?: boolean;
}

export interface FunctionColumn {
  id: string;
  label: string;
  type: "ABC" | "Answer a question" | "Extract";
}
