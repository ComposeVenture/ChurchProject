const SHEETURL='https://docs.google.com/spreadsheets/d/1IbSB2xrDMuUy56NvR7a7_nGScEP3iV_8LjNavN8EGHY/edit';

const SHEETID='1IbSB2xrDMuUy56NvR7a7_nGScEP3iV_8LjNavN8EGHY';

const AUTORUN=()=>{

    if (localStorage.getItem('NetWork')) {
        
        PAGESDOWNLOAD();

        syncData();

    }
   
    if (localStorage.getItem('UserData')) {
        
        HOMEPAGE();

        AUTOUSER((info)=>{console.log('User Still Exists')})

        return;

    } else {

        if (localStorage.getItem('Verification')) {

            EMAILVERIFICATIONPAGE();

            return;
            
        }
        
        LOGINPAGE();

        return

    }
  
}

const HOMEPAGE=()=>{

    DISPLAY('',`

        <div class='HomeDiv'>

            <div class='RecommendedMovies'></div>

            <h2 class='RecommendedNames'>Animations</h2>

            <div class='RecommendedDiv'></div>

            <h2 class='RecommendedNames'>Movies</h2>

            <div class='RecommendedDiv'></div>

            <h2 class='RecommendedNames'>Horrors</h2>

            <div class='RecommendedDiv'></div>

            <h2 class='RecommendedNames'>Nigerian</h2>

            <div class='RecommendedDiv'></div>

            <h2 class='RecommendedNames'>Romance</h2>

            <div class='RecommendedDiv'></div>

            <h2 class='RecommendedNames'>Historical</h2>

            <div class='RecommendedDiv'></div>

            <br><br><br><br>
        
        </div>

        <footer class='RoundFooter'>

            <img onclick='CATERGORIESPAGE()' src='${WHITELISTICON}'/>

            <img onclick='FREEWATCHPAGE()' src='${WHITEMOVIESICON}'/>

            <img onclick='USERACCOUNTPAGE()' src='${WHITEUSERHOLDERICON}'/>
        
        </footer>

    `);

};

const LOGINPAGE=()=>{

    DISPLAY('',`

        <h1>Movie Lander</h1>

        <p>Your Home Cinema</p>

        <input type='email' class='Email' placeholder='Enter User Email' />

        <input type='password' class='Password' placeholder='Enter User Password' />

        <button class='forestgreen'>Sign In </button>

        <button class='blue' onclick='CREATEACCOUNTPAGE()' >Create Account </button>

    `);

    const Email=document.querySelector('.Email');

    const Password=document.querySelector('.Password');

    CLICKED('.forestgreen',()=>{

        DECLARATION('.forestgreen',(ELEMENT)=>{

            if (!Email.value) {
                
                TOAST('Enter User Email');

                return;

            }

            if (!Password.value) {
                
                TOAST('Enter User Password');

                return;

            }

            LOADER(ELEMENT);

            GETDATA(SHEETURL,'Users',(data)=>{

                FINDER(data,'UserEmail',Email.value,(users)=>{

                    if (users.UserEmail === Email.value ) {

                        if (users.UserPassword === Password.value) {

                            JSONIFICATION(users,(Userdata)=>{

                                STORE('local','UserData',Userdata);
    
                                HOMEPAGE();

                                return;
    
                            });
                            
                        } else {

                            
                            TOAST('Wrong User Password');

                            ORIGIN(ELEMENT,'Sign In');

                            return;

                        }

                        return;
 
                    };

                    TOAST('No User Account Found');

                    ORIGIN(ELEMENT,'Sign In');

                    return;

                });

            });

        });

    });

}

const EMAILVERIFICATIONPAGE=()=>{

    DISPLAY('',`

        <h1>Movie Lander</h1>

        <p>Your Home Cinema</p>

        <input type='tel' class='VerficationCode'  maxlength='6' placeholder='Enter Verification Code ' />

        <button class='forestgreen' >Verify</button>

        <button class='blue'>Cancel </button>

    `);

    const VerficationCode=document.querySelector('.VerficationCode');

    CLICKED('.forestgreen',()=>{

        DECLARATION('.forestgreen',(ELEMENT)=>{

            DEJSON('local','UserData',(data)=>{

                if (!VerficationCode.value) {
                
                    TOAST('Enter Verification Code');
    
                    return;
    
                }
    
                if (VerficationCode.value === data.Code ) {

                    LOADER(ELEMENT);

                    GETDATA(SHEETURL,'Users',(datata)=>{
        
                        FINDER(datata,'UserEmail',data.UserEmail,(users)=>{
        
                            if (users === true ) {
        
                                JSONIFICATION(users,(Userdata)=>{
        
                                    STORE('local','UserData',Userdata);

                                    DELETESTORAGE('local','Verification');

                                    HOMEPAGE();

                                    return;
        
                                })
                                        
                            } 

                            const HEADERS=['UserName','UserEmail','Device','UserPassword','Code','CreatedOn'];
                            
                            const DATA=[data.UserName,data.UserEmail,data.Device,data.UserPassword,data.Code,data.CreatedOn];
        
                            INSERTDATA(SHEETURL,'Users',HEADERS,DATA,(returnData)=>{

                                console.log(returnData)

                                DELETESTORAGE('local','Verification');

                                HOMEPAGE();

                                return;

                            });
        
                        });
        
                    });
                   
                    return;
    
                }else{

                    TOAST('Wrong Verification Code');
    
                    return;

                }

            });

        });

    });

    CLICKED('.blue',()=>{

        DELETESTORAGE('local','Verification');

        DELETESTORAGE('local','UserData');

        RELOADPAGE();

    })

}

const CREATEACCOUNTPAGE=()=>{

    DISPLAY('',`

        <h1>Movie Lander</h1>

        <p>Your Home Cinema</p>

        <input type='text' class='UserName' placeholder='Enter User Name' />

        <input type='email' class='Email' placeholder='Enter User Email' />

        <input type='password' class='Password'  placeholder='Enter User Password' />

        <button class='forestgreen' >Sign Up</button>

        <button class='blue' onclick='LOGINPAGE()'>LogIn </button>

    `);

    const UserName=document.querySelector('.UserName');

    const Email=document.querySelector('.Email');

    const Password=document.querySelector('.Password');

    CLICKED('.forestgreen',()=>{

        DECLARATION('.forestgreen',(ELEMENT)=>{

            if (!UserName.value) {
                
                TOAST('Enter User Name');

                return;

            }

            if (!Email.value) {
                
                TOAST('Enter User Email');

                return;

            }

            if (!Password.value) {
                
                TOAST('Enter User Password');

                return;

            }

            LOADER(ELEMENT);

            GETDATA(SHEETURL,'Users',(data)=>{

                FINDER(data,'UserEmail',Email.value,(users)=>{

                    if (users === false ) {

                        DEVICED((Me)=>{

                            RANDOMCODE((Code)=>{

                                const USERSDATA={
                                    "UserEmail":Email.value,
                                    "UserName":UserName.value,
                                    "UserPassword":Password.value,
                                    "CreatedOn":new Date(),
                                    "Device":Me,
                                    "Code":Code
                                };

                                JSONIFICATION(USERSDATA,(Userdata)=>{

                                    STORE('local','UserData',Userdata);

                                    STORE('local','Verification',true);

                                    POSTMAIL(Email.value,'Movie Lander Account',`Dear User Thank You For Creating An Account On Movie Lander\n The Verification Code is :\n\n ${Code}`,(EmailBack)=>{{
                                        
                                        EMAILVERIFICATIONPAGE();

                                        return;

                                    }});

                                });

                            })

                        })
                        return;
                        
                    } 

                    TOAST('User Email Account Found');

                    ORIGIN(ELEMENT,'Sign Up');

                    return;

                })

                console.log(data)

            })



        });

    });

}

const CATERGORIESPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='BackIcon' onclick='HOMEPAGE()'  src='${WHITEBACKICON}'/>

            <p class='RightText'>Catergories</p>
        
        </header>

        <div class='DataHolders'></div>

    `);

}

const FREEWATCHPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='BackIcon' onclick='HOMEPAGE()'  src='${WHITEBACKICON}'/>

            <p class='RightText'>Cinematic</p>
        
        </header>

        <div class='DataHolders'></div>

    `);

}

const USERACCOUNTPAGE=()=>{

    DEJSON('local','UserData',(data)=>{

        DISPLAY('',`

            <header>
    
                <img class='BackIcon' onclick='HOMEPAGE()'  src='${WHITEBACKICON}'/>
    
                <p class='RightText'>Profile</p>
            
            </header>
    
            <div class='MyProfileHolder'>
    
                <div class='ProfilePhotoHolder'>
    
                    <img class='ProfilePhoto' src='${data.ProfileImage||WHITEUSERHOLDERICON}'/>

                    <div class='UploadPhotoHolder'>

                        <img class='WhiteUpdateIcon'src='${WHITEPOSTICON}'/>
                    
                    </div>
    
                </div>
    
                <div class='UserDetailsHolder'>

                    <p>${data.UserName}</p>
                
                </div>
            
            </div>
    
            <div class='SectionHodlers'>
    
                <button class='Button'>
    
                    <h3 class='Title'>Settings</h3>
    
                    <img class='DirectionalIcon' src='${WHITESINGLEBACKICON}'/>
                
                </button>
    
                <button class='Button' onclick='PRIVACYPOLICYPAGE()' >
    
                    <h3 class='Title'>Privacy Policy</h3>
    
                    <img class='DirectionalIcon' src='${WHITESINGLEBACKICON}'/>
                
                </button>
    
                <button class='Button'>
    
                    <h3 class='Title'>Parental Control</h3>
    
                    <img class='DirectionalIcon' src='${WHITESINGLEBACKICON}'/>
                
                </button>
    
                <button class='Button'>
    
                    <h3 class='Title'>Help</h3>
    
                    <img class='DirectionalIcon' src='${WHITESINGLEBACKICON}'/>
                
                </button>
    
                <button class='Button' onclick='LOGOUTPAGE()'>
    
                    <h3 class='Title'>Log Out</h3>
    
                    <img class='DirectionalIcon' src='${WHITESINGLEBACKICON}'/>
                
                </button>
    
                <button id='DeleteAccount' class='Button'>
    
                    <h3 class='Title'>Delete Account</h3>
    
                    <img class='DirectionalIcon' src='${WHITESINGLEBACKICON}'/>
                
                </button>
            
            </div>
    
        `);
        
        CLICKED('.WhiteUpdateIcon',()=>{IMAGEPICKER('.ProfilePhoto',(ImageData)=>{

            DECLARATION('.UploadPhotoHolder',(ELEMENT)=>{

                const PROFILEPHOTODAA=[data.UserName,data.UserEmail,data.Device,data.UserPassword,data.Code,data.CreatedOn,ImageData];

                LOADER(ELEMENT);

                UPDATEDATA(SHEETURL,'Users',data.ID,PROFILEPHOTODAA,(response)=>{

                    console.log(response);

                    AUTOUSER((info)=>{USERACCOUNTPAGE()});

                });

            });
        
        })});

    });

}

const PRIVACYPOLICYPAGE=()=>{

    DISPLAY('',`

        <header>

            <img class='BackIcon' onclick='USERACCOUNTPAGE()'  src='${WHITEBACKICON}'/>

            <p class='RightText'>Privacy Policy</p>
        
        </header>

        <div class='DataHolders'>${localStorage.getItem('PrivacyPolicy')}</div>

    `);

}

const PAGESDOWNLOAD=()=>{

    const PRIVACYPOLICY='https://composeventure.github.io/SERVER/Project/Movie%20Lander/PrivacyPolicy.txt';

    GETPACKAGE(PRIVACYPOLICY,'cors',(data)=>{

        STORE('local','PrivacyPolicy',data);

    })

}

const LOGOUTPAGE=()=>{

    DELETESTORAGE('local','UserData');

    LOGINPAGE();

}

const AUTOUSER=(callback)=>{

    DEJSON('local','UserData',(datata)=>{

    GETDATA(SHEETURL,'Users',(data)=>{

        FINDER(data,'UserEmail',datata.UserEmail,(users)=>{

            if (users.UserEmail === datata.UserEmail ) {

                JSONIFICATION(users,(Userdata)=>{

                    STORE('local','UserData',Userdata);

                    callback(users);

                });

                return;

            };

                LOGOUTPAGE();

                return;

            });

        });

    })

}

const syncData = () => {
    GETPACKAGE(FUNCTIONSAPI,'cors',(data)=>{
        STORE('local','Functions',data);
        GETPACKAGE(STYLESAPI,'cors',(datata)=>{
            STORE('local','Styles',datata);
            GETPACKAGE(PAYMENTAPI,'cors',(datatata)=>{
                STORE('local','Payments',datatata);
                STORE('local','Updates','Updated')
                setTimeout(() => {
                    RELOADPAGE();
                }, 1000);
        
            })    
        })
    })
};