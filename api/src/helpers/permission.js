/* ==========================================================================================
 * @desc   Create an authorization mechanism for GraphQL resolver
 * @param  resolver : the first passed resolver(authorization resolver)
 * @return Authorization resolver and user's defined resolver(query/mutation)
 ==========================================================================================*/
const createResolver = (resolver) => {

	// Set the first passed resolver to an authorization resolver(but it's just the same resolver)
	const baseResolver = resolver

	/* =========================================================================================
	 * @desc   Create a resolver creator function then requiredAuth.createResolver()
	 *         ready to be invoked 
	 * @param  childResolver : Real GraphQL resolver
	 * @return function resolver(authorization resolver)
 	==========================================================================================*/
	baseResolver.createResolver = (childResolver) => {
		
		/* =================================================================================
		 * @desc   Constructing a new resolver(user's defined GraphQL resolver)
		 * @return User's defined GraphQL resolver
 		==================================================================================*/
		const newResolver = async (parent, args, context, info) => {
			
			// "Performing authorization" by running authorization resolver
			// Authoriztion resolver will run first. Then, the query/mutation
			// will be performed
			await resolver(parent, args, context, info)

			// Performing real user's defined GraphQL query/mutation
			// Not running the query/mutation just return it as a callback
			// So, GraphQL server could invoke it when it's need to be invoked
			return childResolver(parent, args, context, info)

		}
		
		// This will call createResolver() and passing newResolver above as a argumenrt
		// So we can stack up multiple resolvers. So, we can perform multiples things
		// even before performing our own query/mutation
		// when this query/mutation is invoked
		return createResolver(newResolver)
	}
	
	// Returning authorization resolver
	return baseResolver 

}

/* ==========================================================================================
 * @desc This function will be verifying wether the user is authenticated or not
 ==========================================================================================*/
export const requiredAuth = createResolver((parent, args, { user }, info) => {
  if (!user || !user.name) {
    throw new Error("Error : User not authenticated")
  } else {
    console.log('User: ' + user.name)
  }
})