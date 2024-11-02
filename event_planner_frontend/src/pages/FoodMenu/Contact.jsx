import './FoodMenu.css';

const Contact = () => {
  return (
    <>
     <section style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '50px 0',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
  flexDirection: 'column'
}}>
  <div style={{
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: "'Poppins', sans-serif",
    lineHeight: '1.6',
    fontSize: '18px',
    color: '#333',
    paddingBottom: '30px'
  }}>
    <p style={{
  fontFamily: "'Poppins', sans-serif",
  lineHeight: '1.6',
  fontSize: '18px',
  color: '#333',
  margin: '0',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}}>
  <strong style={{ fontSize: '20px', color: '#a2783a' }}>Our state-of-the-art kitchen </strong> 
  boasts the capabilities to cater to an event of any size. <strong>Eat, drink and be merry!</strong> 
  <em>Refined Stack Co</em> boasts one of the largest professional kitchens in the Toronto Area. 
  Led by our own <strong>Executive Chef</strong> with our team of <em>culinary experts</em> and professional servers, 
  we aim to create a dining experience comprised of enticing <strong>flavor</strong> and variety.
</p>

  </div>
  
  <div style={{
    display: 'flex',
    gap: '20px'
  }}>
    <button style={{
      backgroundColor: '#a2783a',
      color: '#fff',
      padding: '15px 25px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} >
      Download our Corporate Menu
    </button>
    
    <button style={{
      backgroundColor: '#a2783a',
      color: '#fff',
      padding: '15px 25px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} >
      Download our Social Menu
    </button>
  </div>
</section>
    </>
  );
};

export default Contact;