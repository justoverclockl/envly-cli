declare module 'chalk-table' {
    interface Column {
        name: string;
        field: string;
    }

    interface Options {
        columns?: Array<string | Column>;
        intersectionCharacter?: string;
        leftPad?: number;
    }

    type Row = Record<string, unknown>;

    function chalkTable(options: Options, data: Row[]): string;

    export default chalkTable;
}