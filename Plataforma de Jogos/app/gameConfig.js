const LABIRINTO_SOURCE = require('../assets/games/mat_labirinto_frutas/index.html')
const SOMA_SOURCE = require('../assets/games/mat_casa_soma/index.html')
const NUVENS_SOURCE = require('../assets/games/ing_nuvem_invader/index.html')
const VERBO_INGLES = require('../assets/games/ing_verbo_ingles/index.html')
const FLORESTA_SOURCE = require('../assets/games/port_palavra_floresta/index.html')
const JUMPER_SOURCE = require('../assets/games/port_jumper/index.html')
const FAZENDA_SOURCE = require('../assets/games/cie_fazenda_feliz/index.html')
const RECICLAGEM_SOURCE = require('../assets/games/cie_frogger_reciclagem/index.html')

export const GAMES_CONFIG = {
    
  'labirinto_frutas': { 
    name: 'Labirinto das Frutas',
    source: LABIRINTO_SOURCE, 
    databasePath: 'scores/mat_labirinto',
    minSucessScore: 6, 
  },
  
  'casa_soma': { 
    name: 'Casa das Somas',
    source: SOMA_SOURCE, 
    databasePath: 'scores/mat_soma',
    minSucessScore: 15, 
  },
  
  'nuvem_invader': { 
    name: 'Shoot the Clouds!',
    source: NUVENS_SOURCE, 
    databasePath: 'scores/ing_nuvem',
    minSucessScore: 24, 
  },

  'verbo_ingles': {
    name: 'Find the Verbs',
    source: VERBO_INGLES,
    databasePath: 'scores/ing_verbo',
    minSucessScore: 5,
  },
  
  'palavra_floresta': { 
    name: 'Complete a Frase',
    source: FLORESTA_SOURCE, 
    databasePath: 'scores/pt_palavra',
    minSucessScore: 10, 
  },

  'jumper': { 
    name: 'Salta-palavras',
    source: JUMPER_SOURCE, 
    databasePath: 'scores/pt_pulapula',
    minSucessScore: 10, 
  },

  'frogger_reciclagem': { 
    name: 'Reciclagem Divertida',
    source: RECICLAGEM_SOURCE, 
    databasePath: 'scores/cie_reciclagem', 
    minSucessScore: 10,
  },

  'fazenda_feliz': { 
    name: 'Fazenda Feliz',
    source: FAZENDA_SOURCE, 
    databasePath: 'scores/cie_fazenda', 
    minSucessScore: 0,
  }
};