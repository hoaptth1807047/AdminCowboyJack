// import React from 'react';
// import { compose } from 'recompose';
//
// import { withAuthorization } from '../Session';
//
// const HomePage = () => (
//   <div className="container margin">
//     <div id="wrapper">
//       <div id="content-wrapper">
//         <div className="container-fluid">
//           <div className="card mb-3">
//             <div className="card-header">
//               <i className="fas fa-chart-area"/>
//               User Table
//             </div>
//             <div className="card-body">
//               <canvas id="myAreaChart" width="100%" height={30}/>
//               div
//             </div>
//             <div className="card-footer small text-muted">
//               Updated yesterday at 11:59 PM
//             </div>
//           </div>
//           {/* DataTables Example */}
//           <div className="card mb-3">
//             <div className="card-header">
//               <i className="fas fa-table"/>
//               Data Table Example
//             </div>
//             <div className="card-body mb-3">
//               <div className="table-responsive">
//                 <table
//                   className="table table-bordered"
//                   id="dataTable"
//                   width="100%"
//                   cellSpacing={0}
//                 >
//                   <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Office</th>
//                     <th>Age</th>
//                     <th>Start date</th>
//                     <th>Salary</th>
//                   </tr>
//                   </thead>
//                   <tfoot>
//                   <tr>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Office</th>
//                     <th>Age</th>
//                     <th>Start date</th>
//                     <th>Salary</th>
//                   </tr>
//                   </tfoot>
//                   <tbody>
//                   <tr>
//                     <td>Tiger Nixon</td>
//                     <td>System Architect</td>
//                     <td>Edinburgh</td>
//                     <td>61</td>
//                     <td>2011/04/25</td>
//                     <td>$320,800</td>
//                   </tr>
//                   <tr>
//                     <td>nany</td>
//                     <td>System Architect</td>
//                     <td>Edinburgh</td>
//                     <td>61</td>
//                     <td>2011/04/25</td>
//                     <td>$320,800</td>
//                   </tr>
//                   <tr>
//                     <td>Garrett Winters</td>
//                     <td>Accountant</td>
//                     <td>Tokyo</td>
//                     <td>63</td>
//                     <td>2011/07/25</td>
//                     <td>$170,750</td>
//                   </tr>
//                   <tr>
//                     <td>Ashton Cox</td>
//                     <td>Junior Technical Author</td>
//                     <td>San Francisco</td>
//                     <td>66</td>
//                     <td>2009/01/12</td>
//                     <td>$86,000</td>
//                   </tr>
//                   <tr>
//                     <td>Cedric Kelly</td>
//                     <td>Senior Javascript Developer</td>
//                     <td>Edinburgh</td>
//                     <td>22</td>
//                     <td>2012/03/29</td>
//                     <td>$433,060</td>
//                   </tr>
//                   <tr>
//                     <td>Airi Satou</td>
//                     <td>Accountant</td>
//                     <td>Tokyo</td>
//                     <td>33</td>
//                     <td>2008/11/28</td>
//                     <td>$162,700</td>
//                   </tr>
//                   <tr>
//                     <td>Brielle Williamson</td>
//                     <td>Integration Specialist</td>
//                     <td>New York</td>
//                     <td>61</td>
//                     <td>2012/12/02</td>
//                     <td>$372,000</td>
//                   </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="card-footer small text-muted">
//               Updated yesterday at 11:59 PM
//             </div>
//           </div>
//         </div>
//         <footer className="sticky-footer">
//           <div className="container my-auto">
//             <div className="copyright text-center my-auto">
//               <span>Copyright © Your Website 2019</span>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   </div>
// );
//
// // const condition = authUser => !!authUser;
// //
// // console.log(condition);
// //
// export default compose(
//   withAuthorization(authUser => !!authUser),
// )(HomePage);
// // export default HomePage;
import React, { Component } from 'react';
import { compose } from 'recompose';
import {withAuthorization} from '../Session';

class HomePage extends Component {
  render() {
    return (
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-warning card-header-icon">
                    <div className="card-icon">
                      <i className="material-icons">content_copy</i>
                    </div>
                    <p className="card-category">Used Space</p>
                    <h3 className="card-title">49/50
                      <small>GB</small>
                    </h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons text-danger">warning</i>
                      <a href="#">Get More Space...</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-success card-header-icon">
                    <div className="card-icon">
                      <i className="material-icons">store</i>
                    </div>
                    <p className="card-category">Revenue</p>
                    <h3 className="card-title">$34,245</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">date_range</i> Last 24 Hours
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-danger card-header-icon">
                    <div className="card-icon">
                      <i className="material-icons">info_outline</i>
                    </div>
                    <p className="card-category">Fixed Issues</p>
                    <h3 className="card-title">75</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">local_offer</i> Tracked from Github
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-info card-header-icon">
                    <div className="card-icon">
                      <i className="fa fa-twitter"/>
                    </div>
                    <p className="card-category">Followers</p>
                    <h3 className="card-title">+245</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">update</i> Just Updated
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card card-chart">
                  <div className="card-header card-header-success">
                    <div className="ct-chart" id="dailySalesChart"/>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Daily Sales</h4>
                    <p className="card-category">
                      <span className="text-success"><i className="fa fa-long-arrow-up"/> 55% </span> increase in
                      today sales.</p>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">access_time</i> updated 4 minutes ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-chart">
                  <div className="card-header card-header-warning">
                    <div className="ct-chart" id="websiteViewsChart"/>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Email Subscriptions</h4>
                    <p className="card-category">Last Campaign Performance</p>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">access_time</i> campaign sent 2 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-chart">
                  <div className="card-header card-header-danger">
                    <div className="ct-chart" id="completedTasksChart"/>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Completed Tasks</h4>
                    <p className="card-category">Last Campaign Performance</p>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">access_time</i> campaign sent 2 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <nav className="float-left">
            </nav>
            <div className="copyright float-right">
              &copy;
              <script>
                document.write(new Date().getFullYear())
              </script>
              , made with <i className="material-icons">favorite</i> by
              <a href="#" target="_blank"/> for a better web.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);
