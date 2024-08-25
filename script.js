const allCategory = async () =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();

    const categoryButtons = document.getElementById('all-buttons');
    data.data.news_category.forEach((items)=>{
        const div = document.createElement('div');
        div.innerHTML=`
            <button onclick="allNews('${items.category_id}')"  class="mt-5">${items.category_name}</button>
        `
        categoryButtons.appendChild(div);
        
    })
    
}


const allNews = async (catId) =>{

    document.getElementById('loading-spiner').style.display='block';

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);

    const data = await response.json();
    data.data.forEach((items)=>{
 
            document.getElementById('loading-spiner').style.display='none';

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ""
        const div = document.createElement('div');
        div.classList.add('singleNews');
        div.innerHTML=`
                        <div class="card card-side bg-gray-200 shadow-xl">
                  <div>
                    <img class="news-photo" src="${items.image_url}" alt=""/>
                  </div>
                <div class="card-body">
                  
                    <div class="flex justify-between center">
                        <h2 class="card-title">${items.title}</h2>
                       <div>
                        <h4>${items.rating.number}</h4>
                        <h4>${items.rating.badge}</h4>
                       </div>
                    </div>

                  <p>${items.details.slice(0, 100)}</p>
                  <div class="card-actions justify-end">

                        <button class="btn btn-primary">Details ></button>
                    </div>

                  </div>
                </div>
        `

        newsContainer.appendChild(div)
        
    })
    
}


const handleSearch = () =>{
    const value = document.getElementById('search-box').value;

    if(value){
        allNews(value);
    }
    else{
        alert('Please enter a valid number')
    }
}

allNews('02');
allCategory();