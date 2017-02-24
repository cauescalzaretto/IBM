class Thermometer {

  constructor( path ) {
    // Really just a button
    // Data attribute for reported sensor value
    // Seed initial value to zero
    // Click to change units
    this.root = document.querySelector( path );
    this.root.setAttribute( 'data-reported', 0 );
    this.root.addEventListener( 'click', evt => this.doClick( evt ) );

    // Currently displayed units
    this.display = Thermometer.FAHRENHEIT;
  }

  // Hide the element
  hide() {
    TweenMax.to( this.root, 0.50, {
      opacity: 0,
      onComplete: this.doHidden,
      onCompleteParams: [this.root]
    } );
  }

  // Show the element
  show() {
    this.root.style.display = 'block';
    TweenMax.to( this.root, 0.50, {
      opacity: 0.65
    } );
  }

  // Update displayed value
  update() {
    // Get most recent reported value from sensor
    let degrees = parseInt( this.root.getAttribute( 'data-reported' ) );

    // Convert units if needed
    if( this.display == Thermometer.FAHRENHEIT ) {
      degrees = Math.round( degrees * 1.8 + 32 );
    }
      
    // Display value
    this.root.innerHTML = degrees + '&deg;';
  }

  // New value from sensor
  // Store in attribute
  // Call to update display
  value( degrees ) {
    this.root.setAttribute( 'data-reported', degrees );
    this.update();
  }

  // Toggle units displayed
  doClick( evt ) {
    // Toggle units
    if( this.display == Thermometer.FAHRENHEIT ) {
      this.display = Thermometer.CELCIUS;
    } else {
      this.display = Thermometer.FAHRENHEIT;
    }

    // Update display
    this.update();
  }

  // Element no longer visible
  // Remove from display (logical)
  doHidden( root ) {
    root.style.display = 'none';
  }

}

// Constants
Thermometer.CELCIUS = 'c';
Thermometer.FAHRENHEIT = 'f';
