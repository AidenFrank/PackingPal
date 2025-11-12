# Packing Pal SDP Assignment #7: Constraint Essay

### Aiden Frank, Jessica Cvetkovska, Monica Escobedo Barahona

There are many factors involved in software development, and one of these factors are constraints. 
Constraints are the physical or non-physical considerations that limit the scope of a project and the work that can be done on it.
Packing Pal has three main constraints that determine the solutions that are possible when working on the project, those being economic, security, and environmental constraints.

The main interaction of Packing Pal involves sending messages and calling up OpenAI’s API to receive AI responses in order to build out a list.
OpenAI does not allow you to use their APIs for free meaning that we will have to personally fund this side of the project.
The costs differ per model, but OpenAI generally determines this cost by how long a message is both from input and output.
The longer the message, the more the cost.
OpenAI lists the estimated cost of input and output for their latest and best model, gpt-5, as $1.25 per 1 million tokens (tokens being a dependent upon roughly the amount of words in a prompt).
The tasks that we will require the AI to perform aren’t intensive enough that we would need the best AI model from OpenAI, so we will probably go with a lower tier model.
The expected cost of the project really just relies on how many people are making lists and how intensive their list making is.
The estimated cost from using OpenAI APIs and the amount of requests a user makes during the list creation process are the two main economic constraints to consider for this project.

Security is also a major constraint for this project. 
The main area this applies to is the database, which will store account information such as usernames, passwords, emails, and anything else that may be required to sign up, as well as information regarding the lists that are saved for later. 
All of these things must be securely stored, especially the passwords.
We are planning to hash and salt the passwords at the minimum, and to have password requirements such as one uppercase, lowercase, number, and special character in the password, as well as requiring a minimum password length of 10 characters. 
This will ensure good password hygiene, and will also ensure that we keep our user’s data secure.

Our project's environmental constraints considerations are relatively minimal since it is primarily a software-based tool that uses OpenAI's API to generate camping packing lists. 
However there are still some environmental factors that we can consider.
In terms of limitations, the project requires an internet connection to function, which means it may not be usable in remote camping areas with little or no service. 
This limits where and how the project can be used or deployed. 
There are no direct environmental impacts such as position or other harmful side effects since the project exists entirely in a digital environment. 
The main indirect concern comes from the energy consumption of servers and cloud computing when OpenAI's API is used, which contributes slightly to carbon emissions. 
The project itself will not negatively impact environmental conditions, but it does have the potential to improve them indirectly. 
By helping users create more efficient packing lists, the tool can reduce unnecessary items being purchased, packed, or wasted during trips. 
This can help minimize overconsumption and reduce the environmental impact compared to current packing methods. 
Overall, while the environmental impact of Packing Pal is minimal, it has the potential to promote more sustainable camping practices through better planning and organization.
