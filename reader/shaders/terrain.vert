attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D hMap;
uniform sampler2D colorMap;
uniform sampler2D sandMsk;
uniform float altura;


void main(){

    vec4 offset = vec4(0.0,0.0,0.0,0.0);
    vTextureCoord = aTextureCoord;

    /*texture2D(sandMsk,aTextureCoord).r*/
    
    if(texture2D(sandMsk,aTextureCoord).r < 0.2)
         offset = vec4(aVertexPosition.x, aVertexPosition.y + texture2D(hMap,aTextureCoord).r *0.30 , aVertexPosition.z, 1.0);
    else 
         offset = vec4(aVertexPosition.x, aVertexPosition.y + 0.15 , aVertexPosition.z, 1.0);

    gl_Position = uPMatrix *uMVMatrix * offset;

}