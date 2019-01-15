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
    search: '42px',
    navbar: '42px',
  },
  colors: {
    accent: '#f3717a',
    border: '#41403e',
  },
}

export default theme
