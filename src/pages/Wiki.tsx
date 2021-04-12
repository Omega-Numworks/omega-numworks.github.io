import React, { Component } from 'react'
import './sass/wiki.sass'

export default class Wiki extends Component {
    render() {
        return (
            <div className="content wiki">
                <div className="wiki__sidebar">
                    <div className="wiki__sidebar__supercategories">
                        <div className="wiki__sidebar__supercategories__supercategory">
                            <div className="wiki__sidebar__supercategories__supercategory__title">Software</div>
                            <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">text_snippet</i>
                        </div>
                        <div className="wiki__sidebar__supercategories__supercategory wiki__sidebar__supercategories__supercategory">
                            <div className="wiki__sidebar__supercategories__supercategory__title">Hardware</div>
                            <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">memory</i>
                        </div>
                        <div className="wiki__sidebar__supercategories__supercategory wiki__sidebar__supercategories__supercategory-active">
                            <div className="wiki__sidebar__supercategories__supercategory__title">Python</div>
                            <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">code</i>
                        </div>
                    </div>
                    <div className="wiki__sidebar__category">
                        <div className="wiki__sidebar__category__title">
                            Introduction
                            <i className="wiki__sidebar__category__title__arrow material-icons-round">arrow_drop_up</i>
                        </div>
                        <div className="wiki__sidebar__category__content">
                            <div className="wiki__sidebar__category__content__item">Première page</div>
                            <div className="wiki__sidebar__category__content__item">Deuxième page</div>
                        </div>
                    </div>
                    <div className="wiki__sidebar__category">
                        <div className="wiki__sidebar__category__title">
                            Build system
                            <i className="wiki__sidebar__category__title__arrow material-icons-round">arrow_drop_down</i>
                        </div>
                    </div>
                </div>
                <div className="wiki__content">
                    <h1 className="wiki__content__h1">Titre</h1>
                    <h2 className="wiki__content__h2">Sous-titre</h2>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h2 className="wiki__content__h2">Un autre sous-titre</h2>
                    <div className="wiki__content__code">
                        git clone --recursive https://github.com/Omega-Numworks/Omega.git<br/>
                        cd Omega<br/>
                        git checkout omega-master<br/>
                        make MODEL=n0100 clean<br/>
                        make MODEL=n0100 USERNAME="Your name, max 15 characters" -j4<br/>
                        make MODEL=n0100 epsilon_flash<br/>
                    </div>
                    <p className="wiki__content__p">Sed ut perspiciatis <span className="wiki__content__inline-code">hello_world()</span> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae <b className="wiki__content__b">dicta sunt explicabo</b>. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                    <h1 className="wiki__content__h1">Un titre h1</h1>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h2 className="wiki__content__h2">Un sous-titre h2</h2>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3 className="wiki__content__h3">Un sous-titre h3</h3>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h4 className="wiki__content__h4">Un sous-titre h4</h4>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h5 className="wiki__content__h5">Un sous-titre h5</h5>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h6 className="wiki__content__h6">Un sous-titre h6</h6>
                    <p className="wiki__content__p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis <i className="wiki__content__i">nostrud exercitation ullamco laboris</i> nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        )
    }
}
