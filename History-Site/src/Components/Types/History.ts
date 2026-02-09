// Interface for et enkelt link i en begivenhed
export interface EventLink {
  title: string;
  link: string;
}

// Interface for en enkelt historisk begivenhed
export interface HistoryEvent {
  year: string;
  text: string;
  html: string;
  no_year_html: string;
  links: EventLink[];
}

// Interface for hele API response
export interface HistoryData {
  date: string;
  url: string;
  data: {
    Events: HistoryEvent[];
    Births: HistoryEvent[];
    Deaths: HistoryEvent[];
  };
}