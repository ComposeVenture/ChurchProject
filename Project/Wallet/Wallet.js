const AUTORUN=()=>{

    PAGESDOWNLOAD()

    if (localStorage.getItem('User')) {
        
        HOMEPAGE();

    } else {
        LOGINPAGE();
    }
    
}

const HOMEPAGE=()=>{

    DEJSON('local','User',(data)=>{
  
        DISPLAY('',`

            <div class='HomeDivHolder'>

                <h1 class='WelcomeNote'>Welcome ${data.UserName}</h1>

                <h3>Account Balance</h3>

                <div class='Holders'>

                    <p class='BalanceAmount'> UGX <span id='Amount' class='colorgreen'>${100000}</span> </p>
                
                </div>

                <h3>Do More On Wallet</h3>

                <div class='BillHolder' >

                    <button onclick='BUYMOBILEPAGE()' class='Button'>

                        Buy Mobile Airtime
                    
                    </button>

                    <button onclick='BUYDATAPAGE()' class='Button'>

                        Buy Mobile Data
                    
                    </button>

                    <button onclick='CREATEINVOICEPAGE()' class='Button'>

                        Create A Invoice
                    
                    </button>

                    <button onclick='USERDEPOSITPAGE()' class='Button'>

                        Deposit Money
                    
                    </button>
                
                </div>

                <p>Powered By PesaPal</p>

            </div>

            <footer>

                <img onclick='USERACCOUNTPAGE()' id='UserAccount' src='${WHITEUSERICON}'/>

                <img onclick='USERDEPOSITPAGE()' class='Deposit' src='${WHITEPOSTICON}'/>

                <img onclick='SETTINGSPAGE()'  src='${WHITESETTINGICON}'/>

            </footer>
            
        `);

    });

}

const LOGINPAGE=()=>{

    DISPLAY('',`

        <h1>Wallet</h1>

        <img  class='AppLogo' src='${WHITEONLINESHOPPINGICON}'/>

        <input type='email' class='colorteal' placeholder='Enter User Email' />

        <button class='teal'>Sign In</button>

        <h3 onclick='CREATEACCOUNTPAGE()'>I don't have a Wallet Account?</h3>
        
    `);

    DECLARATION('.teal',(ELEMENT)=>{

        EVENT(ELEMENT,'click',()=>{

            LOADER(ELEMENT);

        });

    });

}

const EMAILVERIFICATIONPAGE=()=>{

    DISPLAY('',`

        <h1>Wallet</h1>

        <img  class='AppLogo' src='${WHITESMSICON}'/>

        <input type='tel' maxlength='6'  class='colorteal' placeholder='Enter Verification Code' />

        <button class='teal' onclick='HOMEPAGE()'>Verify</button>

        <h3 onclick='CREATEACCOUNTPAGE()'>I don't have a Wallet Account?</h3>
        
    `);

}

const CREATEACCOUNTPAGE=()=>{

    DISPLAY('',`

        <h1>Wallet</h1>

        <img  class='AppLogo' src='${WHITEONLINESHOPPINGICON}'/>

        <input type='text' class='colorteal' placeholder='Enter User Name' />

        <input type='email' class='colorteal' placeholder='Enter User Email' />

        <button onclick='EMAILVERIFICATIONPAGE()' class='teal'>Sign Up</button>

        <h3 onclick='LOGINPAGE()'>I already Have A  Wallet Account?</h3>
        
    `);

}

const USERACCOUNTPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='LeftedIcon' onclick='HOMEPAGE()' src='${WHITEBACKICON}'/>
        
        </header>

    `);

}

const USERDEPOSITPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='LeftedIcon' onclick='HOMEPAGE()' src='${WHITEBACKICON}'/>
        
        </header>

    `);

}

const SETTINGSPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='LeftedIcon' onclick='HOMEPAGE()' src='${WHITEBACKICON}'/>
        
        </header>

    `);

}

const BUYDATAPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='LeftedIcon' onclick='HOMEPAGE()' src='${WHITEBACKICON}'/>
        
        </header>

    `);

}

const BUYMOBILEPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='LeftedIcon' onclick='HOMEPAGE()' src='${WHITEBACKICON}'/>
        
        </header>

    `);

}

const CREATEINVOICEPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='LeftedIcon' onclick='HOMEPAGE()' src='${WHITEBACKICON}'/>
        
        </header>

    `);

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