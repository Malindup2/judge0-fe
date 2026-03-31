'use client';

import { useEffect, useState, useMemo } from 'react';
import api from '@/lib/http';
import { LeaderboardUser, LeaderboardResponse } from '@/types/types';

// --- Internal Hooks ---

function useLeaderboard(pageSize: number) {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await api.get<LeaderboardResponse>(
          '/challenges/leaderboard/get',
          {
            params: { page: currentPage, pageSize },
          }
        );

        if (res.data.users) {
          setUsers(res.data.users);
          setTotalPages(res.data.totalPages || 1);
          setError(null);
        } else {
          setUsers([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
        setError('Error loading leaderboard. Please try again later.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentPage, pageSize]);

  return { users, loading, error, currentPage, totalPages, setCurrentPage };
}

// --- Sub-components ---

const LeaderboardSkeleton = ({
  isFirstPage,
  pageSize,
}: {
  isFirstPage: boolean;
  pageSize: number;
}) => (
  <div className="w-full flex flex-col items-center animate-pulse">
    {isFirstPage && (
      <div className="flex items-end justify-center gap-6 mb-16 w-full opacity-60">
        {[220, 260, 220].map((width, i) => (
          <div key={i} className={`flex flex-col items-center w-[${width}px]`}>
            <div
              className={`w-${i === 1 ? '20' : '16'} h-${i === 1 ? '16' : '12'} bg-[#162E19] mb-[-${i === 1 ? '2.2' : '1.8'}rem] rounded-sm`}
            ></div>
            <div
              className={`w-full h-${i === 1 ? '48' : '40'} bg-[#0C0E19]/60 border border-[#162E19] px-4 pt-12 pb-6 flex flex-col items-center gap-3 rounded-sm`}
            >
              <div className="w-24 h-4 bg-[#162E19] rounded"></div>
              <div className="w-16 h-3 bg-[#162E19] rounded"></div>
              <div className="w-20 h-6 bg-[#162E19] rounded-sm mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    )}
    <div className="w-full bg-[#111111]/40 border border-[#162E19] p-2 rounded-sm opacity-50">
      <div className="flex items-center py-4 px-6 gap-4">
        <div className="w-[20%] h-3 bg-[#162E19] rounded opacity-50"></div>
        <div className="w-[55%] h-3 bg-[#162E19] rounded opacity-50"></div>
        <div className="w-[25%] h-3 bg-[#162E19] rounded text-right opacity-50 ml-auto"></div>
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: isFirstPage ? 7 : pageSize }).map((_, i) => (
          <div
            key={i}
            className="flex items-center border border-[#162E19] bg-[#0C0E19]/80 py-4 px-6 h-14"
          >
            <div className="w-[20%] h-3 bg-[#162E19] rounded w-8 opacity-40"></div>
            <div className="w-[55%] h-3 bg-[#162E19] rounded w-32 opacity-40"></div>
            <div className="w-[25%] h-3 bg-[#162E19] rounded w-16 ml-auto opacity-40"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Podium = ({ top3 }: { top3: LeaderboardUser[] }) => {
  const podiumConfig = [
    {
      rank: 3,
      user: top3[2],
      width: 'w-[220px]',
      fontSize: 'text-6xl',
      margin: 'mb-[-1.8rem]',
      shadow: 'drop-shadow(0_0_10px_rgba(44,212,58,0.6))',
      pt: 'pt-12',
      pb: 'pb-6',
      bg: 'bg-[#0C0E19]/60',
    },
    {
      rank: 1,
      user: top3[0],
      width: 'w-[260px]',
      fontSize: 'text-7xl',
      margin: 'mb-[-2.2rem]',
      shadow: 'drop-shadow(0_0_12px_rgba(64,253,81,0.7))',
      pt: 'pt-14',
      pb: 'pb-8',
      bg: 'bg-[#0C0E19]/80 shadow-[0_0_20px_rgba(64,253,81,0.05)]',
    },
    {
      rank: 2,
      user: top3[1],
      width: 'w-[220px]',
      fontSize: 'text-6xl',
      margin: 'mb-[-1.8rem]',
      shadow: 'drop-shadow(0_0_10px_rgba(64,253,81,0.6))',
      pt: 'pt-12',
      pb: 'pb-6',
      bg: 'bg-[#0C0E19]/60',
    },
  ];

  return (
    <div className="flex items-end justify-center gap-6 mb-16 w-full">
      {podiumConfig.map(
        ({ rank, user, width, fontSize, margin, shadow, pt, pb, bg }) =>
          user && (
            <div
              key={user.user_id}
              className={`flex flex-col items-center ${width}`}
            >
              <span
                className={`${fontSize} font-bold ${margin} relative z-10`}
                style={{
                  background: 'linear-gradient(to right, #FFFFFF, #40FD51)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: shadow,
                }}
              >
                {rank}
              </span>
              <div
                className={`w-full flex flex-col items-center px-4 ${pt} ${pb} border border-[#162E19] ${bg}`}
              >
                <span
                  className={`${rank === 1 ? 'text-xl' : 'text-lg'} text-white mb-2 truncate max-w-full uppercase font-medium tracking-tight`}
                >
                  {user.name}
                </span>
                <span className="text-sm text-gray-300 mb-4 font-mono">
                  {user.xp} <span className="text-[#40fd51]">XP</span>
                </span>
                <div className="px-5 py-2 border border-[#162E19] text-[#40fd51] text-[10px] font-bold tracking-[0.2em]">
                  # RANK {rank}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

const UserRow = ({
  user,
  index,
  currentPage,
  pageSize,
  isFirstPage,
}: {
  user: LeaderboardUser;
  index: number;
  currentPage: number;
  pageSize: number;
  isFirstPage: boolean;
}) => {
  const rank =
    (currentPage - 1) * pageSize + (isFirstPage ? index + 4 : index + 1);
  return (
    <div className="flex items-center border border-[#40fd51]/20 bg-[#0C0E19]/80 py-4 px-6 hover:border-[#40fd51]/40 transition-all duration-300 group">
      <div className="w-[20%] text-gray-400 font-mono text-sm group-hover:text-[#40fd51] transition-colors">
        #{String(rank).padStart(2, '0')}
      </div>
      <div className="w-[55%] text-gray-200 text-sm font-medium group-hover:text-white transition-colors">
        {user.name}
      </div>
      <div className="w-[25%] text-gray-200 text-sm font-mono text-right px-4">
        {user.xp} <span className="text-[#40fd51]/60 text-[10px] ml-1">XP</span>
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center gap-3 mt-10 text-sm font-mono">
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className="text-gray-500 hover:text-[#40fd51] transition-colors disabled:opacity-20 disabled:cursor-not-allowed px-2"
    >
      &lt;
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-sm transition-all ${
          currentPage === page
            ? 'bg-[#40fd51] text-black shadow-[0_0_10px_rgba(64,253,81,0.3)]'
            : 'text-gray-400 hover:text-[#40fd51] hover:bg-[#162E19]/50'
        }`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="text-gray-500 hover:text-[#40fd51] transition-colors disabled:opacity-20 disabled:cursor-not-allowed px-2"
    >
      &gt;
    </button>
  </div>
);

// --- Main Component ---

export default function Leaderboard() {
  const pageSize = 10;
  const { users, loading, error, currentPage, totalPages, setCurrentPage } =
    useLeaderboard(pageSize);

  const isFirstPage = currentPage === 1;

  // Use useMemo for performance to derive podium and list data
  const { top3, restOfUsers } = useMemo(
    () => ({
      top3: isFirstPage ? users.slice(0, 3) : [],
      restOfUsers: isFirstPage ? users.slice(3) : users,
    }),
    [users, isFirstPage]
  );

  return (
    <div className="w-full flex justify-center pb-20 font-sans">
      <main className="flex-1 flex flex-col items-center mt-12 px-0 relative z-10 w-full max-w-[1000px]">
        <header className="flex flex-col items-center mb-16">
          <h1 className="text-[14px] font-semibold text-[#40fd51] tracking-[0.3em] text-center uppercase">
            LEADERBOARD LIVE.
          </h1>
        </header>

        {loading ? (
          <LeaderboardSkeleton isFirstPage={isFirstPage} pageSize={pageSize} />
        ) : error ? (
          <div className="text-red-400 py-10 font-mono text-sm border border-red-900/30 bg-red-900/10 px-8 rounded-sm">
            {error}
          </div>
        ) : users.length > 0 ? (
          <div className="w-full flex flex-col items-center fade-in">
            {isFirstPage && <Podium top3={top3} />}

            <div className="w-full bg-[#111111]/60 border border-[#162E19] p-2 rounded-sm">
              <div className="flex items-center text-[#40fd51] text-[10px] font-bold tracking-[0.25em] py-4 px-6 opacity-80 uppercase">
                <div className="w-[20%]">Rank</div>
                <div className="w-[55%]">Participant</div>
                <div className="w-[25%] text-right px-4">Experience</div>
              </div>

              <div className="flex flex-col gap-2">
                {restOfUsers.map((user, index) => (
                  <UserRow
                    key={user.user_id}
                    user={user}
                    index={index}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    isFirstPage={isFirstPage}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pb-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-400 py-12 border border-[#162E19] w-full text-center bg-[#0C0E19]/40 font-mono text-sm tracking-widest">
            NO USERS FOUND.
          </div>
        )}
      </main>
    </div>
  );
}
