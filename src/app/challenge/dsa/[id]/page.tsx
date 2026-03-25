'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';

export default function DSAChallengePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden font-sans text-[#ededed]">
      <style jsx global>{`
        body {
          background-color: #070916;
        }
      `}</style>
      <Navbar />

      <main className="mx-auto flex h-full w-full max-w-[1536px] flex-1 flex-col gap-6 overflow-hidden p-6 lg:flex-row xl:gap-14 xl:px-16 xl:py-8">
        {/* Left Panel: Info Cards */}
        <div className="flex h-full w-full flex-col gap-6 lg:w-[46.4%] lg:flex-shrink-0">
          {/* Top Card: Title */}
          <div className="relative flex flex-col border border-[#3ddc84]/15 bg-[#0C0E19]/80 transition-all duration-300">
            {/* Header */}
            <div className="border-b border-[#3ddc84]/15 px-6 py-5">
              <h1 className="text-lg font-semibold tracking-wide text-[#3ddc84] xl:text-xl">
                Count Distinct Words
              </h1>
            </div>
            {/* Content */}
            <div className="p-6">
              <p className="text-[15px] leading-7 text-[#ededed]/70 xl:text-base">
                Write a program that reads a line of text and determines how
                many distinct words appear in it. Words are sequences of letters
                separated by spaces. Uppercase....
              </p>
            </div>
          </div>

          {/* Bottom Card: Description */}
          <div className="relative flex flex-1 flex-col border border-[#3ddc84]/15 bg-[#0C0E19]/80 transition-all duration-300">
            {/* Header */}
            <div className="border-b border-[#3ddc84]/15 px-6 py-5">
              <h2 className="text-lg font-semibold tracking-wide text-[#3ddc84] xl:text-xl">
                Description
              </h2>
            </div>

            {/* Content */}
            <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6 pb-12">
              <p className="whitespace-pre-wrap text-[15px] leading-7 text-[#ededed]/70 xl:text-base">
                Write a program that reads a line of text and determines how
                many distinct words appear in it. Words are sequences of letters
                separated by spaces. Uppercase and lowercase letters are treated
                as the same.
                {'\n\n'}
                Input: A single line of text containing words separated by
                spaces.
                {'\n\n'}
                Output: Print the number of distinct words in the given text.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Terminal area */}
        <div className="relative mb-6 flex h-full w-full flex-1 flex-col xl:mb-8">
          <div className="flex h-full flex-col border border-[#3ddc84]/15 bg-[#0C0E19]/80 transition-all duration-300">
            {/* Terminal Header */}
            <div className="border-b border-[#3ddc84]/15 px-6 py-4">
              <span className="text-[14px] font-medium tracking-wide text-[#3ddc84]/80">
                Terminal
              </span>
            </div>

            {/* Terminal Content */}
            <div className="relative flex flex-1 flex-col overflow-hidden p-6 pb-20">
              <textarea
                className="h-full w-full resize-none bg-transparent font-mono text-[14px] leading-relaxed text-[#ededed]/80 focus:outline-none"
                spellCheck={false}
              />

              {/* Submit Button */}
              <div className="absolute bottom-6 right-6">
                <button
                  type="button"
                  className="cursor-pointer border border-[#3ddc84]/40 bg-transparent px-10 py-2.5 text-sm font-semibold tracking-widest text-[#3ddc84] transition-all duration-200 hover:border-[#3ddc84]/60 hover:bg-[#3ddc84]/10 active:scale-[0.98]"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(61, 220, 132, 0.15); /* #3ddc84 */
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(61, 220, 132, 0.3);
        }
      `}</style>
    </div>
  );
}
