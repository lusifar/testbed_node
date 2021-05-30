exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        { author: 'Stephane', title: 'Stephane Blog Title', content: 'First blog' },
        { author: 'Paulo', title: 'Paulo Blog Title', content: 'First blog' },
        { author: 'James', title: 'James Blog Title', content: 'First blog' },
      ]);
    });
};
