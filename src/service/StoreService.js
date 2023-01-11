class StoreService {

    constructor() {
        this.FAV_MOVIES_KEY = 'favMovies'
        this.BLOCK_MOVIES_KEY = 'blockMovies'
        this.favMovies = [];
        this.blockMovies = [];
    }

    getFavs() {
        return JSON.parse(localStorage.getItem(this.FAV_MOVIES_KEY)) || []
    }

    getBlocks() {
        return JSON.parse(localStorage.getItem(this.BLOCK_MOVIES_KEY)) || [];
    }

    saveBlock(movie) {
        this.blockMovies = this.getBlocks();
        this.blockMovies.push(movie);
        localStorage.setItem(this.BLOCK_MOVIES_KEY, JSON.stringify(this.blockMovies));
    }

    removeBlock(movie) {
        this.blockMovies = this.getBlocks();
        this.blockMovies = this.blockMovies.filter(m => m.id !== movie.id);
        localStorage.setItem(this.BLOCK_MOVIES_KEY, JSON.stringify(this.blockMovies));
    }

    saveFav(movie) {
        this.favMovies = this.getFavs();
        this.favMovies.push(movie);
        localStorage.setItem(this.FAV_MOVIES_KEY, JSON.stringify(this.favMovies));
    }

    removeFav(movie) {
        this.favMovies = this.getFavs();
        this.favMovies = this.favMovies.filter(m => m.id !== movie.id);
        localStorage.setItem(this.FAV_MOVIES_KEY, JSON.stringify(this.favMovies));
    }
}

export default new StoreService()