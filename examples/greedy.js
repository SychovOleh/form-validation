var str = '"petya","masha","elena","manya"'; console.log(str.match(/".*"/g));    // жадное, заматчит всю строку
console.log(str.match(/".*?"/g));   // недажное, выдаст массив имен
console.log(str.match(/"[^"]*"/g)); // не может быть жадным или
                                    // нежадным по своей сути
