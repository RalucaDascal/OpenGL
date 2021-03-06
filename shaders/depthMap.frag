#version 410 core

out vec4 fColor;
in vec4 fragPosLightSpace;
vec3 ambient;
vec3 specular;
vec3 diffuse;

uniform sampler2D shadowMap;
float computeShadow()
{
	// perform perspective divide
	vec3 normalizedCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
	normalizedCoords = normalizedCoords * 0.5 + 0.5;
	float closestDepth = texture(shadowMap, normalizedCoords.xy).r;
	float currentDepth = normalizedCoords.z;
	float shadow = currentDepth > closestDepth ? 1.0 : 0.0;

	return shadow;
}

void main()
{
	
	float shadow = computeShadow();
	vec3 color = min((ambient + (1.0f - shadow)*diffuse) + (1.0f - shadow)*specular, 1.0f);
	fColor = vec4(color,0.0f);
}