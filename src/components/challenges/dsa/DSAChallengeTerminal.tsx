'use client';

import React, { useState } from 'react';

export default function DSAChallengeTerminal() {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    console.log('Submitting code:', code);
    // submission logic here
  };

  return (
    <div className="relative mb-6 flex h-full w-full flex-1 flex-col xl:mb-8">
      <div className="flex h-full flex-col border border-[#40FD51]/25 bg-[#0C0E19]/80 transition-all duration-300">
        {/* Terminal Header */}
        <div className="border-b border-[#40FD51]/25 px-6 py-4">
          <span className="text-base font-medium tracking-wide text-white">
            Terminal
          </span>
        </div>

        {/* Terminal Content */}
        <div className="relative flex flex-1 flex-col overflow-hidden p-6 pb-20">
          <textarea
            className="h-full w-full resize-none bg-transparent font-mono text-[14px] leading-relaxed text-white focus:outline-none"
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here..."
          />

          {/* Submit Button */}
          <div className="absolute bottom-6 right-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="cursor-pointer border border-[#40FD51] bg-transparent px-10 py-2.5 text-sm font-semibold tracking-widest text-[#40FD51] transition-all duration-200 hover:border-[#40FD51] hover:bg-[#40FD51]/10 active:scale-[0.98]"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
