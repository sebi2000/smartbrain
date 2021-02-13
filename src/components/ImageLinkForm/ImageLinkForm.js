import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onSearchChange, onButtonClick }) => {
    return (
        <div>
            <p className='f3 white'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="form center pa4 b3 shadow-5 w-75">
                <input className='w-50 f4 pa2' type='text' onChange={onSearchChange}/>
                <button className=' grow f4 link ph3 pv2 dib white bg-dark-blue pointer' onClick={onButtonClick}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;