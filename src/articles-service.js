const ArticlesService = {
  getAllArticles(knex) {
    return knex.select('*').from('blogful_articles');
  },
  getById(knex, id) {
    return knex
      .from('blogful_articles')
      .select('*')
      .where('id', id)
      .first();
  }
};

module.exports = ArticlesService;
