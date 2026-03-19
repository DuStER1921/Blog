'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  ArrowDown,
  Edit2, 
  Plus, 
  ArrowUpRight,
  Settings,
  BarChart3,
  PenTool
} from 'lucide-react';

// --- PODACI ---
const POSTS = [
  {
    id: 1,
    cat: 'savjeti',
    catLabel: 'Savjeti',
    title: '5 pitanja koja morate postaviti majstoru prije nego potpišete ugovor',
    excerpt: 'Zaštitite svoju investiciju. Ova pitanja filtriraju nepouzdane od profesionalnih izvođača radova.',
    time: 5,
    date: '8. mart 2026.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    cat: 'keramicar',
    catLabel: 'Keramičar',
    title: 'Ceresit vs Mapei vs Sika: koji ljepak za pločice pobjeđuje?',
    excerpt: 'Testirali smo tri vodeća brenda na identičnoj podlozi. Rezultati su iznenadili i nas.',
    time: 6,
    date: '5. mart 2026.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    cat: 'moler',
    catLabel: 'Moler',
    title: 'JUB, Bekament ili Helios: vodič kroz premaze i boje za 2026.',
    excerpt: 'Cijene, pokrivenost, miris, trajnost — detaljna usporedba za svaki budžet.',
    time: 4,
    date: '1. mart 2026.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    cat: 'savjeti',
    catLabel: 'Savjeti',
    title: 'Kako čitati PDF troškovnik iz kalkulatora: objašnjenje svake stavke',
    excerpt: 'Materijal, rad, priprema, škart — šta svaka linija u izvještaju zaista znači za vaš džep.',
    time: 3,
    date: '25. feb. 2026.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 5,
    cat: 'elektrika',
    catLabel: 'Elektrika',
    title: 'Schneider vs Hager vs BTicino: razvodne table u 2026.',
    excerpt: 'Koji brend pruža pravu zaštitu za kućnu instalaciju bez preplaćivanja materijala.',
    time: 5,
    date: '20. feb. 2026.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 6,
    cat: 'voda',
    catLabel: 'Vodoinstalater',
    title: 'Geberit ili LIV Fix: koji ugradni vodokotlić vrijedi svoju cijenu?',
    excerpt: 'Montaža, popravka, garancija — sve što vlasnici stanova trebaju znati pri kupovini.',
    time: 4,
    date: '15. feb. 2026.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 7,
    cat: 'moler',
    catLabel: 'Moler',
    title: 'Kako odabrati pravu nijansu bijele boje za vaš prostor?',
    excerpt: 'Topla, hladna ili neutralna bijela? Naučite kako svjetlost utiče na percepciju boje u vašem domu.',
    time: 3,
    date: '10. feb. 2026.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 8,
    cat: 'savjeti',
    catLabel: 'Savjeti',
    title: '5 najčešćih grešaka pri renovaciji kupatila',
    excerpt: 'Izbjegnite ove skupe greške koje većina vlasnika napravi prilikom planiranja novog kupatila.',
    time: 6,
    date: '05. feb. 2026.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop',
  },
];

const CATEGORIES = [
  { id: 'sve', label: 'Sve objave' },
  { id: 'savjeti', label: 'Savjeti' },
  { id: 'cijene', label: 'Cijene & Tržište' },
  { id: 'keramicar', label: 'Keramičar' },
  { id: 'moler', label: 'Moler' },
  { id: 'voda', label: 'Vodoinstalater' },
  { id: 'elektrika', label: 'Elektrika' },
];

export default function BlogLanding() {
  const [activeCat, setActiveCat] = useState('sve');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Vlasnik je logovan
  const isOwner = true; 

  const filteredPosts = activeCat === 'sve' ? POSTS : POSTS.filter(p => p.cat === activeCat);
  const featuredPost = filteredPosts[0];
  const allGridPosts = filteredPosts.slice(1);

  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(allGridPosts.length / POSTS_PER_PAGE);
  const currentGridPosts = allGridPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCat]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-[#0052CC] selection:text-white pb-40 relative">
      
      {/* STRUKTURALNA NAVIGACIJA (Bez sjenki, samo čista linija) */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-[#F9FAFB]/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 h-[72px] md:h-[88px] flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer group">
            <div className="w-10 h-10 bg-[#0052CC] text-white flex items-center justify-center font-serif italic font-bold text-xl transition-transform group-hover:scale-105">
              M
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">MajstoriBH</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            <a href="#" className="text-[11px] font-bold text-slate-500 hover:text-[#0052CC] transition-colors uppercase tracking-[0.15em]">Za Majstore</a>
            <a href="#" className="text-[11px] font-bold text-slate-500 hover:text-[#0052CC] transition-colors uppercase tracking-[0.15em]">Pronađi</a>
            <a href="#" className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.15em] relative">
              Blog
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#0052CC]"></span>
            </a>
          </div>

          <div className="flex items-center">
            <button className="bg-slate-900 text-white hover:bg-[#0052CC] rounded-none px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-colors">
              Kalkulator
            </button>
          </div>
        </div>
      </nav>

      {/* MASSIVE TYPOGRAPHY HERO */}
      <header className="relative z-10 pt-[140px] md:pt-[200px] pb-[60px] md:pb-[100px] px-6 md:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="lg:col-span-8 relative">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[14vw] md:text-[12vw] lg:text-[130px] xl:text-[150px] font-medium leading-[0.85] tracking-tighter text-slate-900"
            >
              Znanje koje <br />
              <span className="text-[#0052CC] italic pr-4">štedi novac.</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 lg:pb-6 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pl-0 lg:pl-10 border-l-0 lg:border-l border-black/10 relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-[#0052CC]"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0052CC]">Misija Bloga</span>
              </div>
              <p className="text-lg md:text-xl text-slate-600 leading-[1.7] font-light max-w-md mb-8">
                Ekskluzivni vodiči, analize cijena i savjeti iz prve ruke. 
                Opremite se znanjem prije nego što započnete renovaciju.
              </p>
              <div className="flex items-center gap-4 cursor-pointer group w-fit" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#0052CC] group-hover:border-[#0052CC] transition-all duration-300">
                  <ArrowDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 group-hover:text-[#0052CC] transition-colors">
                  Istraži teme
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16">
        
        {/* EDITORIAL FILTERI */}
        <div className="flex gap-6 md:gap-10 overflow-x-auto pb-8 mb-12 md:mb-16 scrollbar-hide border-b border-black/[0.06]">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`whitespace-nowrap pb-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all relative ${
                activeCat === cat.id
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cat.label}
              {activeCat === cat.id && (
                <motion.div 
                  layoutId="activeFilterLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0052CC]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ISTAKNUTA OBJAVA (Premium Split Layout) */}
        <AnimatePresence mode="wait">
          {featuredPost && activeCat === 'sve' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-32 group cursor-pointer relative"
            >
              {/* Admin Hover Action */}
              {isOwner && (
                <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href={`/admin/blog/edit/${featuredPost.id}`} className="bg-white/90 backdrop-blur-xl text-slate-900 hover:text-[#0052CC] rounded-full p-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-105 transition-transform">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center group">
                <Link href={`/blog/${featuredPost.id}`} className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-black/10 block">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  {/* Subtle overlay that fades out on hover for a "lighting up" effect */}
                  <div className="absolute inset-0 bg-black/5 transition-colors duration-700 group-hover:bg-transparent" />
                </Link>
                
                <div className="flex flex-col justify-center pr-4 lg:pr-12">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[#0052CC] text-xs font-bold uppercase tracking-widest bg-[#0052CC]/10 px-4 py-2 rounded-full">
                      Istaknuto
                    </span>
                    <button 
                      onClick={(e) => { e.preventDefault(); setActiveCat(featuredPost.cat); }}
                      className="text-slate-500 hover:text-[#0052CC] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                    >
                      {featuredPost.catLabel}
                    </button>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.id}`}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight group-hover:text-[#0052CC] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  
                  <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-8">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                      <span>{featuredPost.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span>{featuredPost.time} min čitanja</span>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#0052CC] group-hover:border-[#0052CC] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ASIMETRIČNA MREŽA OBJAVA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {allGridPosts.length === 0 && activeCat !== 'sve' ? (
              <div className="text-center py-40">
                <p className="text-slate-400 font-medium text-xl">Nema objava u ovoj kategoriji.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-28">
                {currentGridPosts.map((post, index) => {
                  const isThird = (index + 1) % 3 === 0;
                  
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      key={post.id} 
                      className={`group cursor-pointer relative transition-all duration-700 hover:-translate-y-1 ${isThird ? 'md:col-span-2 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center' : 'flex flex-col'}`}
                    >
                      {/* Admin Hover Action */}
                      {isOwner && (
                        <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Link href={`/admin/blog/edit/${post.id}`} className="bg-white/90 backdrop-blur-xl text-slate-900 hover:text-[#0052CC] rounded-full p-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-105 transition-transform">
                            <Edit2 className="w-4 h-4" />
                          </Link>
                        </div>
                      )}

                      <Link href={`/blog/${post.id}`} className={`relative w-full overflow-hidden bg-slate-100 rounded-3xl shadow-sm group-hover:shadow-xl group-hover:shadow-black/10 transition-all duration-700 block ${isThird ? 'md:col-span-7 aspect-[4/3] md:aspect-[16/10] order-1 md:order-2' : 'aspect-[4/3] mb-8 order-1'}`}>
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          referrerPolicy="no-referrer"
                        />
                        {/* Subtle overlay that fades out on hover for a "lighting up" effect */}
                        <div className="absolute inset-0 bg-black/[0.03] transition-colors duration-700 group-hover:bg-transparent" />
                      </Link>
                      
                      <div className={`${isThird ? 'md:col-span-5 flex flex-col justify-center order-2 md:order-1' : 'flex flex-col flex-1 order-2'}`}>
                        <div className="flex items-center gap-3 mb-5">
                          <button 
                            onClick={(e) => { e.preventDefault(); setActiveCat(post.cat); }}
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0052CC] hover:bg-[#0052CC] hover:text-white transition-colors bg-[#0052CC]/5 px-3 py-1.5 rounded-full cursor-pointer"
                          >
                            {post.catLabel}
                          </button>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <h3 className={`font-serif font-medium leading-[1.1] tracking-tight text-slate-900 mb-4 group-hover:text-[#0052CC] transition-colors duration-300 ${isThird ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl'}`}>
                            {post.title}
                          </h3>
                        </Link>
                        <p className={`text-slate-500 leading-relaxed font-light ${isThird ? 'text-lg mb-8' : 'text-base mb-6 line-clamp-3'}`}>
                          {post.excerpt}
                        </p>
                        <div className={`mt-auto flex items-center justify-between ${isThird ? 'pt-6 border-t border-slate-100' : ''}`}>
                          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            <span>{post.date}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                            <span>{post.time} min čitanja</span>
                          </div>
                          <Link href={`/blog/${post.id}`} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#0052CC] group-hover:border-[#0052CC] group-hover:text-white transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* PAGINACIJA */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-24">
                <button 
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 800, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 text-slate-500 hover:text-slate-900 hover:border-black/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 800, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-[13px] font-bold transition-all ${
                        currentPage === i + 1 
                          ? 'bg-[#0052CC] text-white shadow-md' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 800, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 text-slate-500 hover:text-slate-900 hover:border-black/30 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* FLOATING ADMIN DOCK (Samo za Owner-a) */}
      <AnimatePresence>
        {isOwner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center gap-2">
              
              <div className="hidden md:flex px-4 py-2 items-center gap-3 border-r border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)] animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Owner</span>
              </div>

              <Link href="/admin/stats" className="flex items-center gap-2 p-3 md:px-5 md:py-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-[11px] font-bold uppercase tracking-[0.1em]" title="Statistika">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:block">Statistika</span>
              </Link>

              <Link href="/admin/categories" className="flex items-center gap-2 p-3 md:px-5 md:py-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-[11px] font-bold uppercase tracking-[0.1em]" title="Kategorije">
                <Settings className="w-4 h-4" />
                <span className="hidden md:block">Kategorije</span>
              </Link>

              <div className="w-[1px] h-8 bg-white/10 mx-1"></div>

              <Link 
                href="/editor"
                className="flex items-center gap-2 px-6 md:px-8 py-3 rounded-full bg-gradient-to-r from-[#0052CC] to-blue-500 text-white hover:shadow-[0_0_30px_rgba(0,82,204,0.6)] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em] shadow-xl border border-blue-400/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <PenTool className="w-4 h-4 relative z-10" />
                <span className="relative z-10 whitespace-nowrap">Nova Objava</span>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
