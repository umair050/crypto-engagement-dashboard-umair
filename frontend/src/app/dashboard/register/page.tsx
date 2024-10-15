
import Register from '@/components/Forms/Register'
import Nav from '@/components/Navigation/Nav'
import React from 'react'

const page = () => {
  return (

    <>
      <div className="container position-sticky z-index-sticky top-1">
        <div className="row">
          <div className="col-12">

            <Nav />

          </div>
        </div>
      </div>
      <main className="main-content mt-0" >

        <section className="min-vh-100 mb-8">
          <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: "url('/img/curved-images/curved14.jpg')" }}>
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 text-center mx-auto">
                  <h1 className="text-white mb-2 mt-5 text-5xl">Welcome!</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-lg-n10 mt-md-n11 mt-n10">
              <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div className="card z-index-0">

                  <div className="card-header text-center pt-4">
                    <h5>Sign UP</h5>
                  </div>

                  <div className="row px-xl-5 px-sm-4 px-3">

                    <div className="mt-2 position-relative text-center">
                      <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 px-3">

                        Add your credentials
     
                      </p>
                    </div>

                  </div>

                  <div className="card-body">
                    <Register />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>

  )
}

export default page