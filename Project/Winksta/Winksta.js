const AUTORUN=()=>{

    if (!localStorage.getItem('User')) {

       HOMEPAGE();

       ITEMSDOWNLOAD();

    } else {
       
        LOGINPAGE();
        
    }

    PAGESDOWNLOAD();

}

const HOMEPAGE=()=>{

    DISPLAY('',`
        
    <img src='${WHITEUSERICON}' class='UserIcon' onclick='UserAccountPage()' id='UserIcon'/>

    <img src='${WHITRETRYICON}' class='ReloadIcon' onclick='RELOADPAGE()'  id='SearcIcon'/>

    <img src='${WHITESEARCHICON}' class='SearchIcon' id='SearcIcon'/>

    <div class='HomeDiv'>

        <div class='OptionsHolders'>

            <div class='Options' id='HomeOptions' >

                <img  src='${WHITEHOMEICON}' />
            
            </div>

            <div class='Options' >

                <p class='Optioned'>Cards</p>
            
            </div>

            <div class='Options' >

                <p class='Optioned'>Jewellery</p>
            
            </div>

            <div class='Options' >

                <p class='Optioned'>Homeware</p>
            
            </div>

            <div class='Options' >

                <p class='Optioned'>Diaries</p>
            
            </div>
        
        </div>

        <div class='SectionedHolder'>

            <div class='Sectioned'>
            
                <p class='Optione'>Featured&nbsp&nbsp&nbspItems</p>

            </div>

            <div class='DataDiv'>

                <div class='Option'></div>

                <div class='Option'></div>

                <div class='Option'></div>

                <div class='Option'></div>

                <div class='Option'></div>
            
            </div>
        
        </div>

        <h3 class='RecommendedText'>Recommended</h3>

        <div class='RecommendedDivs'></div>

    </div>

    <footer class='RoundFooter'>

        <img  src='${WHITEHOMEICON}' id='HomeIcon'/>

        <img src='${WHITEUNHEARTICON}'  id='LikeIcon'/>

        <img src='${WHITECARTICON}'  id='CartIcon'/>
        
    </footer>

    `);

    RECOMMENDEDITEMS();
    
}

const LOGINPAGE=()=>{

    DISPLAY('',`
        <br> <br> <br> <br> <br>
        <img class='logo' src='${APPLOGO}'/>
        <br><br>
        <input type='email' id='LoginEmail' placeholder='Enter Email' />
        <input type='password' id='LoginPassword' placeholder='Enter Password' />
        <button class='forestgreen' id='LoginButton' onclick="EMAILVERIFICATION()">Sign In</button>
        <h1 class='ForgotPassword'>Forgot Password?</h1>
        <p  id='Messages' onclick='CREATEACCOUNTPAGE()' class='CreateAccount'>I don't Have An Account, <b>Create Account?</b></p>
    `);

};

const CREATEACCOUNTPAGE=()=>{

    DISPLAY('',`
        <br> <br> <br> <br> <br>
        <img class='logo' src='${APPLOGO}'/>
        <br><br>
        <input type='text' id='UserName' placeholder='Enter User Name' />
        <input type='email' id='UserEmail' placeholder='Enter  User Email' />
        <input type='password' id='UserPassword' placeholder='Enter User Password' />
        <button class='forestgreen' id='CreateUserButton' onclick="EMAILVERIFICATION()">Sign Up</button>
        <p onclick='LOGINPAGE()' class='CreateAccount'>I already have Account <b>LogIn?</b> </p>      
    `);
};

const FORGOTPASSWORD=()=>{

}

const EMAILVERIFICATION=()=>{

    DISPLAY('',`
        <br> <br> <br> <br> <br>
        <img class='logo' src='${APPLOGO}'/>
        <input type='tel' maxlength='6' id='UserCode' placeholder='Enter Verification Code' />
        <button class='forestgreen' id='VerificationCodeButton' onclick="HOMEPAGE()">Verification</button>
        <p class='CreateAccount' id='Message' onclick='CREATEACCOUNTPAGE()'>I don't Want to Verify,<b> Cancel?</b></p> 
    `)

}

const PAGESDOWNLOAD=()=>{

    if (localStorage.getItem('NetWork')) {

        const DATA={

            "sheetName":"Connections"
    
        };
    
        POSTPACKAGE(GETAPI,'',DATA,(data)=>{
    
            REDUX(data,(element)=>{
    
                STORE('local',element.Name,element.Link);
    
            });
    
        });

        return;
        
    }

};

const ITEMSDOWNLOAD=()=>{

    if (localStorage.getItem('NetWork')) {

        const DATA={

            "sheetName":"Stuff"
    
        };
    
        POSTPACKAGE(GETAPI,'',DATA,(data)=>{

            console.log(data);

            const STOR={
                "Name":"WinkastaItems",
                "Data":data
            };

            STOREINDEXED('WinkStaItem','Items',STOR,(reso)=>{

                if (reso === false ) {

                    STORE('local','UpdatedItems','Downloaded');

                    RECOMMENDEDITEMS();
            
                    return;
                    
                } else {
                 
                    if (localStorage.getItem('UpdatedItems')) {

                        UPDATEINDEXED('WinkStaItem','Items',STOR);

                        return;
                        
                    } else {
                       
                        AUTORUN();

                        return;
                        
                    };
                    
                };

            });

        });

        return;
        
    };

};

const RECOMMENDEDITEMS=()=>{

    DECLARATION('.RecommendedDivs',(ELEMENT)=>{

        LOADER(ELEMENT,'LoaderIcon');

        GETINDEXED('WinkStaItem','Items',(data)=>{

           CLEAR(ELEMENT);

            REDUX(data,(element)=>{

                REDUX(element.Data,(elementone)=>{

                    CREATEELEMENT('div','Helddata',(ELEMENTED)=>{

                        DISPLAY(ELEMENTED,`

                            <img class='Imaged' src='${elementone.Image}'/>

                            <h3 class='ItemNamed'>${elementone.Item}</h3>

                            <p class='Pricetag'> $ ${elementone.Price} </p>
                            
                        `);

                        ADD(ELEMENT,ELEMENTED);

                        EVENT(ELEMENTED,'click',()=>{

                            JSONIFICATION(elementone,(info)=>{

                                STORE('','Item',info);

                                PRICEPAGE();

                            });

                        })

                    });
    
                });

            });
     
        });

    });

}

const PRICEPAGE=()=>{
    
    DEJSON('','Item',(data)=>{

        DISPLAY('',`

            <div class='ImagesHolder'>

                <img class='Imager'  src='${data.Image}'/>

                <img  class='Imager' src='${data.Image}'/>

                <img  class='Imager' src='${data.Image}'/>
            
            </div>

            <img class='SearchIcon' onclick='HOMEPAGE()' src='${WHITESINGLEBACKICON}'/>

            <div class='PriceHolder'>

                <img src='${WHITEUNHEARTICON}' class='UserIcon'  id='UserIcon'/>

                <h1 id='NameItem' class='LeftText'>${data.Item}</h1>

                <h3 id='PriceItem' class='LeftText'>$ ${data.Price}</h3>

                <p id='ItemDetails' class='LeftText'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla iste dolores repellat, corrupti neque ipsum facere, deserunt in dolorem repellendus quasi autem accusamus nam? Qui neque provident incidunt alias explicabo!</p>

                <div class='SizeHolder'>

                    <div class='Options' >

                        <p class='Optioned'>small</p>
                    
                    </div>

                    <div class='Options' >

                        <p class='Optioned'>medium</p>
                    
                    </div>

                    <div class='Options' >

                        <p class='Optioned'>large</p>
                    
                    </div>
                
                </div>
            
            </div>

            <footer class='RoundFooter'>

                <button class='ButonBottom'>

                    <img src='${WHITECARTICON}'/>

                    <h3 class='LeftText'> Add To Cart </h3>

                </button>
            
            </footer>

        `);

    });

};