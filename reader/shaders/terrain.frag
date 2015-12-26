#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D hMap;
uniform sampler2D colorMap;
uniform sampler2D sandMsk;

void main() {

    if(texture2D(sandMsk, vTextureCoord).r < 0.2){
        gl_FragColor = texture2D(colorMap, vTextureCoord); 
    }
    else 
        gl_FragColor = texture2D(sandMsk, vTextureCoord);
        

    
}