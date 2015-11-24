attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D hMap;
uniform sampler2D colorMap;


void main(){

    vec4 offset = vec4(0.0,0.0,0.0,0.0);

//you only need to read one because the image is black and white (and grey). 
   float color =  texture2D(hMap,aTextureCoord).r;

    offset = vec4(aVertexPosition.x, aVertexPosition.y + texture2D(hMap,aTextureCoord).r*0.25 , aVertexPosition.z, 1.0);
    gl_Position = uPMatrix *uMVMatrix * offset;

    vTextureCoord = aTextureCoord;

}