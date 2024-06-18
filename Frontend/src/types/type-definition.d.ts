declare module 'graphql-request' {
  import { DocumentNode } from 'graphql';

  export class GraphQLClient {
    constructor(endpoint: string, options?: any);
    request<T = any>(query: string | DocumentNode, variables?: any): Promise<T>;
  }

  export function gql(literals: TemplateStringsArray, ...placeholders: any[]): DocumentNode;
  export function request<T = any>(url: string, query: string | DocumentNode, variables?: any): Promise<T>;
}



declare module 'react-plotly.js' {
  const Plot: any;
  export default Plot;
}


declare module '../exports/DashboardExport' {
  const exportDashboard: (userId: string) => Promise<void>;
  export default exportDashboard;
}


