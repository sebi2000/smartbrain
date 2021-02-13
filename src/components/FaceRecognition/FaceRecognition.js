import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="centerMid ma">
            <div className="absolute mt2">
                <img id="inputimage" src={imageUrl} width='400px' heigh='auto' />
                <div className="bounding-box"  style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} > </div>
            </div>
            {/*style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}*/}
        </div>
    );
}

export default FaceRecognition;
