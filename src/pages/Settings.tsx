import React from 'react'

const Settings = () => {
  return (
    <div className='divide-y-4 flex flex-col gap-5'>
      <section>
        <div className='bg-green-500' >
          <img src="" alt="profile image" />
          <h1>John Doe</h1>
          <p>john.doe@example.com</p>
        </div>
      </section>

      <section className='flex flex-col  ' >
        <h2>Basic information</h2>
        <p>Update your name and e-mail in this section. Note: this information will be public to all your project colleagues and can be changed anytime.</p>
        
        <label htmlFor="">First name</label>
        <input type="text" placeholder='New first name' />
        <label htmlFor="">Last name</label>
        <input type="text" placeholder='New last name' />
        <label htmlFor="">E-mail</label>
        <input type="email" placeholder='New e-mail' />
      </section>
    </div> )
}

export default Settings
