// src/Terminal.js
import React, { useState } from 'react';

const title = `__________.__  __                .__      __________              _____      .__  .__
\\______   \\__|/  |_  ____   _____|  |__   \\______   \____________/ ____\____ |  | |__| ____  
 |       _/  \   __\/ __ \ /  ___/  |  \   |     ___/  _ \_  __ \   __\/  _ \|  | |  |/  _ \ 
 |    |   \  ||  | \  ___/ \___ \|   Y  \  |    |  (  <_> )  | \/|  | (  <_> )  |_|  (  <_> )
 |____|_  /__||__|  \___  >____  >___|  /  |____|   \____/|__|   |__|  \____/|____/__|\____/ 
        \/              \/     \/     \/                                                     `

const TerminalComponent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to the interactive terminal!', 'Type "help" to see available commands.']);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCommand = (command) => {
    const args = command.trim().split(' ');
    let newOutput = [];

    switch (args[0]) {
      case 'help':
        newOutput = [
          'Available commands:',
          'help - Show this help message',
          'ls - List files',
          'cat <file> - Show file contents',
          'cd <dir> - Change directory',
        ];
        break;
      case 'ls':
        newOutput = ['file1.txt', 'file2.txt'];
        break;
      case 'cat':
        if (args[1]) {
          newOutput = [`Contents of ${args[1]}`];
        } else {
          newOutput = ['Usage: cat <file>'];
        }
        break;
      case 'cd':
        if (args[1]) {
          newOutput = [`Changed directory to ${args[1]}`];
        } else {
          newOutput = ['Usage: cd <dir>'];
        }
        break;
      default:
        newOutput = [`Command not found: ${command}`];
    }

    setOutput([...output, `$ ${command}`, ...newOutput]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen w-screen p-4 font-mono">
      <div className="h-full overflow-y-auto">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div className="flex">
            <div>{title}</div>
            
          <span className="pr-2">$</span>
          <input
            className="bg-gray-900 text-white flex-1 outline-none border-0"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
