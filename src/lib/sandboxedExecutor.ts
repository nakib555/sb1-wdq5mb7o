interface SandboxContext {
  console: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
  };
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
  Promise: typeof Promise;
  Math: typeof Math;
  Date: typeof Date;
  Array: typeof Array;
  Object: typeof Object;
  String: typeof String;
  Number: typeof Number;
  Boolean: typeof Boolean;
  Error: typeof Error;
}

export async function executeSandboxedCode(code: string): Promise<string> {
  const output: string[] = [];
  
  const context: SandboxContext = {
    console: {
      log: (...args) => output.push(...args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      )),
      error: (...args) => output.push(`Error: ${args.join(' ')}`),
      warn: (...args) => output.push(`Warning: ${args.join(' ')}`),
    },
    setTimeout,
    clearTimeout,
    Promise,
    Math,
    Date,
    Array,
    Object,
    String,
    Number,
    Boolean,
    Error,
  };

  try {
    const fn = new Function(...Object.keys(context), code);
    const result = await fn(...Object.values(context));
    
    if (result !== undefined) {
      output.push(`Return value: ${JSON.stringify(result, null, 2)}`);
    }

    return output.join('\n');
  } catch (error) {
    return `Runtime Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
  }
}