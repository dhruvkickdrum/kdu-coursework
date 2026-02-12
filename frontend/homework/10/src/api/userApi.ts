import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateUserPayload, createUserResponse, User, UsersResponse } from "../types";

const baseUrl = "https://dummyjson.com"
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    tagTypes: ['Users', 'User'],
    endpoints: (build) => ({
        getUsers: build.query<UsersResponse, void>({
            query: () => '/users',
            providesTags: (result) => result ? 
            [...result.users.map(({id}) => ({
                type: 'Users' as const, id
            })),{type: 'Users' , id: 'LIST'}] : [{type: 'Users', id: "LIST"}],
            transformResponse: (response: UsersResponse) => {
                return response;
            }
        }),

        getUserById: build.query<User, number>({
            query: (id) => `/users/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
            transformResponse: (response: User) => {
                return response;
            },
        }),

        
        createUser: build.mutation<createUserResponse, CreateUserPayload> ({
            query: (body) => ({
                url: '/users/add',
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['User'],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdUser } = await queryFulfilled;

                    dispatch(
                        usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
                            const exists = draft.users.some((user) => user.id === createdUser.id);

                            draft.users = [createdUser, ...draft.users.filter((user) => user.id !== createdUser.id)];
                            if (!exists) {
                                draft.total += 1;
                            }
                        })
                    );

                    dispatch(usersApi.util.upsertQueryData('getUserById', createdUser.id, createdUser));
                } catch {
                    console.error("Error occured");
                }
            },
            transformResponse: (response: createUserResponse) => {
                console.log("Respone : ", response);
                return response;
            }
        })

    })
})

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation } = usersApi;

export type { UsersResponse, User, CreateUserPayload, createUserResponse};
