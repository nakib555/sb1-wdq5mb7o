interface ExecutionResult {
  output: string;
  error?: string;
}

export async function executeCode(code: string): Promise<ExecutionResult> {
  try {
    // Create a safe environment for code execution
    const sandbox = {
      console: {
        log: (...args: any[]) => output.push(...args.map(String)),
        error: (...args: any[]) => output.push(...args.map(String)),
      },
      setTimeout,
      clearTimeout,
      Promise,
    };

    const output: string[] = [];
    
    // Execute the code in the sandbox
    const fn = new Function(...Object.keys(sandbox), code);
    await fn(...Object.values(sandbox));

    return { output: output.join('\n') };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'An error occurred'
    };
  }
}