export type Theme = {
  heights: {
    search: string
    navbar: string
  }
  colors: {
    accent: string
    border: string
  }
}

const theme: Theme = {
  heights: {
    search: '60px',
    navbar: '48px',
  },
  colors: {
    accent: '#f3717a',
    border: '#41403e',
  },
}

export default theme
