import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { del, externalGet, get, post } from './client';
import { useEffect, useState } from 'react';

function Favorite() {

    const { data: favCharacters, isFetching, refetch: refetchFav } = useQuery(
        ["favCharacters"], () => get("/favCharacters")
    );
    const { mutate: deleteMutate } = useMutation({
        onMutate: async (id) => {
            await del(`/favCharacters/${id}`);
            refetchFav();
        }
    });
    return (
        <>
            {isFetching ? <h1>...Wifi fass kar</h1> : (
                <>
                    <h1>
                        Rick and Morty
                    </h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "25px" }}>
                        {
                            favCharacters.map((Character) => {
                                return (
                                    <div style={{ border: "1px solid #999999", padding: "0 0 10px 0", position: "relative" }}>
                                        <div style={{
                                            position: "absolute",
                                            right: 0,
                                            top: 0,
                                            height: "30px",
                                            width: "30px",
                                            backgroundColor: "white",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        >
                                            <i onClick={() => deleteMutate(Character?.id)} style={{ fontSize: "22px" }} className="fa-solid fa-star" />
                                        </div>
                                        <img style={{ width: "100%" }} src={Character?.image} />
                                        <h2 style={{ margin: "0 0 10px 0" }}>{Character?.name}</h2>
                                    </div >
                                )
                            })
                        }
                    </div>
                </>
            )
            }
        </>
    )
}


export default Favorite;