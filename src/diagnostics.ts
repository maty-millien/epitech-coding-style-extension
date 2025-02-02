import * as vscode from 'vscode';
import { ERROR_DESCRIPTIONS, ErrorCode } from './constants';

/**
 * Returns the VS Code diagnostic severity based on the error severity.
 * @param severity - Error severity string.
 */
function getSeverityLevel(severity: string): vscode.DiagnosticSeverity {
    switch (severity) {
        case 'MAJOR':
            return vscode.DiagnosticSeverity.Error;
        case 'MINOR':
            return vscode.DiagnosticSeverity.Warning;
        case 'INFO':
            return vscode.DiagnosticSeverity.Information;
        default:
            return vscode.DiagnosticSeverity.Hint;
    }
}

/**
 * Creates diagnostics from an array of error codes.
 * @param errors - An array of errors.
 */
export function createDiagnostics(errors: ErrorCode[]): vscode.Diagnostic[] {
    return errors.map(error => {
        const severity = getSeverityLevel(error.severity);
        const description = ERROR_DESCRIPTIONS[error.code] || 'No description available';
        const range = new vscode.Range(error.line, 0, error.line, Number.MAX_VALUE);
        return new vscode.Diagnostic(range, `${error.code} - ${description}`, severity);
    });
}
