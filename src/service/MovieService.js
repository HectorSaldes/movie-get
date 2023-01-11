import StoreService from "@/service/StoreService";

class MovieService {
    constructor() {
        this.API_KEY = '01dea653ba31b62c3b21085420c8b6e5'
        this.NUMBER_OF_MOVIES = 5
        this.MOVIES = []
        this.CURRENT_PAGE = 1
    }

    async getMovies() {
        return await this.clearMovies()
    }

    async getRequestMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${this.CURRENT_PAGE++}`)
            .then(response => response.json())
            .then(data => data)
        this.MOVIES = [...this.MOVIES, ...response.results]
    }

    async clearMovies() {
        const favMovies = StoreService.getFavs()
        const blockMovies = StoreService.getBlocks()
        do {
            await this.getRequestMovies()
            for (let i = 0; i < favMovies.length; i++)
                this.MOVIES = this.MOVIES.filter(movie => movie.id !== favMovies[i].id)
            for (let i = 0; i < blockMovies.length; i++)
                this.MOVIES = this.MOVIES.filter(movie => movie.id !== blockMovies[i].id)
        } while (this.MOVIES.length < this.NUMBER_OF_MOVIES)

        const sendMovies = this.MOVIES.slice(0, this.NUMBER_OF_MOVIES)
        this.MOVIES = this.MOVIES.slice(this.NUMBER_OF_MOVIES)
        return sendMovies
    }
}

export default new MovieService()