import axios from "axios";
export default {
    namespaced: true,
    state() {
        return {
            recipe: [],
            favoriteRecipe: []
        }
    },
    mutations: {
        GET_RECIPE(state, data) {
            state.recipe = data
        },
        FAVORITE_RECIPE(state, recipe) {
            const existingRecipe = state.favoriteRecipe.find(item => item.label === recipe.label);
            if (!existingRecipe) {
                state.favoriteRecipe.push(recipe);
            } else {
                state.favoriteRecipe = state.favoriteRecipe.filter(item => item.label !== recipe.label);
            }
        }
    },
    actions: {
        async getRecipe(context, searchBy) {
            try {
                const response = await axios.get(`https://api.edamam.com/search?app_id=2bc600a3&app_key=1de47a2f471a653f2819b0d80a56f9f9&from=10&to=50&q=${searchBy}`)
                context.commit('GET_RECIPE', response)
            } catch (error) {
                console.log(error)
            }
        },
        isFavoriteRecipe(context, favoriteRecipe) {
            context.commit('FAVORITE_RECIPE', favoriteRecipe)

        }

    },
    getters: {
        getRecipe(state) {
            return state.recipe
        },
        favoriteRecipe(state) {
            return state.favoriteRecipe
        }

    }
}