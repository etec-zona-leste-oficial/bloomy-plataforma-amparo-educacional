import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffffff] font-sans">
      <div className="flex items-center justify-center lg:my-10">
        <main className="rounded-xl flex w-full max-w-full lg:max-w-[90%] flex-col items-center justify-between bg-[#F9E9FF] lg:items-start lg:shadow-2xl">
          {/* Bloomy */}
          <div id="bloomy" className="w-full mt-10 lg:mt-20 scroll-mt-20">
            <h1 className="text-3xl lg:text-6xl font-bold text-center text-[#974DCA] mb-6 lg:mb-10 font-[family-name:var(--font-luckiest-guy)]">
              Bem-vindo
            </h1>
            <Image
              className="mx-auto my-10 lg:my-20"
              src="/ImagemBannerBloomy.png"
              alt="Bloomy Logo"
              width={800}
              height={200}
            />
            <h1 className="text-3xl lg:text-6xl font-bold text-center text-[#974DCA] mb-6 lg:mb-10 mt-6 lg:mt-10 font-[family-name:var(--font-bebas-neue)]">
              O sistema de amparo educacional que cabe na palma da sua mão!
            </h1>
          </div>

          <div className="my-6 lg:my-10 h-1 w-[90%] mx-auto bg-[#BA68C8] rounded-xl" />

          {/* Baixe o app! */}
          <div id="baixe" className="w-full scroll-mt-20">
            <h1 className="mx-auto text-3xl lg:text-6xl font-bold text-center text-[#974DCA] mb-6 lg:mb-10 mt-6 lg:mt-10 font-[family-name:var(--font-luckiest-guy)] px-4">
              Baixe o app!
            </h1>
            <p className="w-[90%] lg:w-[80%] mx-auto text-center text-xl lg:text-4xl text-[#4A148C] font-[family-name:var(--font-bebas-neue)] px-4">
              Nosso aplicativo já esta disponível para download! Clique no botão abaixo para baixar e começar a usar o Bloomy hoje mesmo.
            </p>
            <Image
              className="mx-auto my-6 lg:my-10"
              src="/MãoBloomy(1).png"
              alt="Bloomy Logo"
              width={800}
              height={150}
            />
            <button className="flex justify-center w-full mb-6 lg:mb-10 mt-10 lg:mt-20">
              <a
                href="https://drive.google.com/file/d/1kBXdHd9I4HfbFomAJVIMymEP7-pdu8ea/view?usp=drive_link"
                download
                className="bg-[#FFBB56] text-white text-xl lg:text-4xl font-bold px-6 lg:px-8 py-3 lg:py-4 rounded-full hover:bg-[#d47f00] transition-colors duration-300 font-[family-name:var(--font-bebas-neue)]"
              >
                Download do App
              </a>
            </button>
          </div>

          <div className="my-6 lg:my-10 h-1 w-[90%] mx-auto bg-[#BA68C8] rounded-xl" />

          {/* Nossa equipe */}
          <div id="equipe" className="scroll-mt-20">
            <h1 className="mx-auto text-3xl lg:text-6xl font-bold text-center text-[#974DCA] mb-6 lg:mb-10 mt-6 lg:mt-10 font-[family-name:var(--font-luckiest-guy)] px-4">
              Nossa equipe
            </h1>
            <p className="w-[90%] lg:w-[80%] mx-auto text-center text-xl lg:text-4xl text-[#4A148C] font-[family-name:var(--font-bebas-neue)] px-4">
              Somos uma equipe dedicada de desenvolvedores e educadores apaixonados por criar soluções inovadoras para melhorar a educação. Juntos, trabalhamos para fazer do Bloomy uma ferramenta eficaz para apoiar estudantes.
            </p>
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mb-10 lg:mb-20 p-6 lg:p-10 w-full justify-center items-center md:items-start">
              <div className="w-[80%] md:w-[25%] shadow-md rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/Lucas.jpg"
                  alt="Foto de Lucas"
                  width={300}
                  height={300}
                />
                <div className="p-3">
                  <p className="text-center text-base lg:text-lg text-[#4A148C] font-[family-name:var(--font-bebas-neue)]">
                    Lucas Bonfim Vilela
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-1 mb-2">
                    <a
                      href="https://github.com/LucasBonfimVilela01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#4A148C] hover:text-[#974DCA] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-xs">LucasBonfimVilela01</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-[80%] md:w-[25%] shadow-md rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/Luma.png"
                  alt="Foto de "
                  width={300}
                  height={300}
                />
                <div className="p-3">
                  <p className="text-center text-base lg:text-lg text-[#4A148C] font-[family-name:var(--font-bebas-neue)]">
                    .Lopes Hilário
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-1 mb-2">
                    <a
                      href="https://github.com/nelum44"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#4A148C] hover:text-[#974DCA] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-xs">nelum44</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-[80%] md:w-[25%] shadow-md rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/Bispo.png"
                  alt="Foto de Bispo"
                  width={300}
                  height={300}
                />
                <div className="p-3">
                  <p className="text-center text-base lg:text-lg text-[#4A148C] font-[family-name:var(--font-bebas-neue)]">
                    João Pedro Bispo de Biasi
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-1 mb-2">
                    <a
                      href="https://github.com/JoaoBispo18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#4A148C] hover:text-[#974DCA] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-xs">JoaoBispo18</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
