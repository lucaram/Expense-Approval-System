let input = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const event = JSON.parse(input);

  const toolInput = JSON.stringify(event.tool_input ?? {});

  const usesDevDatabase =
    toolInput.includes('expenses.db') &&
    !toolInput.includes('expenses-test.db');

  if (usesDevDatabase) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason:
            'Automated QE work must not use backend/expenses.db. Use backend/expenses-test.db instead.'
        }
      })
    );

    return;
  }

  process.stdout.write(
    JSON.stringify({
      continue: true
    })
  );
});