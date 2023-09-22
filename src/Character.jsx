import { useMutation, useQuery } from 'react-query'
import { del, externalGet, get, post } from './client';
import { useEffect, useState } from 'react';
import { useAddToFavCharacters, useAddtoLikeCharacters } from './hooks/api.hooks';

function Character() {

    const [nextUrl, setNextUrl] = useState("");

    const { data, isFetching, refetch } = useQuery(["characters'"], () =>
        externalGet(nextUrl || "https://rickandmortyapi.com/api/character")
    );

    const { data: favCharacters, refetch: refetchFav } = useQuery(
        ["favCharacters"], () => get("/favCharacters")
    );
    const { data: likedCharacters, refetch: refetchLiked } = useQuery(
        ["likedCharacters"], () => get("/likedCharacters")
    );

    const { mutate: onAddToFav } = useAddToFavCharacters({
        onSuccess: () => refetchFav(),
    });
    const { mutate: onAddToLike } = useAddtoLikeCharacters({
        onSuccess: () => refetchLiked(),
    });

    const { mutate: deleteMutate } = useMutation({
        onMutate: async (id) => {
            await del(`/favCharacters/${id}`);
            refetchFav();
        }
    })
    const { mutate: deleteLikedMutate } = useMutation({
        onMutate: async (id) => {
            await del(`/likedCharacters/${id}`);
            refetchLiked();
        }
    })
    useEffect(() => {
        refetch();
    }, [nextUrl])

    return (
        <>
            {isFetching ? <h1>...Wifi fass kar</h1> : (
                <>
                    <h1>
                        Rick and Morty
                    </h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "25px" }}>
                        {
                            data?.results?.map((Character) => {
                                const isFavorite = favCharacters?.find(
                                    (char) => char.name === Character.name
                                );
                                const isLiked = likedCharacters?.find(
                                    (char) => char.name === Character.name
                                );
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
                                            {isFavorite ? (
                                                <i onClick={() => deleteMutate(isFavorite?.id)} style={{ fontSize: "22px" }} className="fa-solid fa-star" />
                                            ) : (
                                                <i onClick={() => {
                                                    delete Character.id;
                                                    onAddToFav(Character);
                                                }} style={{ fontSize: "22px" }} className="fa-regular fa-star" />
                                            )}
                                        </div>
                                        <img style={{ width: "100%" }} src={Character?.image} />
                                        <div style={{ display: "flex" }}>
                                            {isLiked ? (
                                                <i onClick={() => deleteLikedMutate(isLiked?.id)} style={{ color: "red", fontSize: "22px" }} className="fa-solid fa-heart" />
                                            ) : (
                                                <i onClick={() => {
                                                    delete Character?.id;
                                                    onAddToLike(Character);
                                                }} style={{ fontSize: "22px" }} className="fa-regular fa-heart" />
                                            )}
                                            <h2 style={{ margin: "0 0 10px 0" }}>{Character?.name}</h2>
                                        </div>
                                    </div >
                                )
                            })
                        }
                    </div>
                    <div
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "25px" }}>
                        <button onClick={() => setNextUrl(data?.info?.prew)}
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                padding: "15px 25px",
                                border: "none",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}> Previos </button>
                        <button onClick={() => setNextUrl(data?.info?.next)}
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                padding: "15px 25px",
                                border: "none",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}> Next </button>
                    </div >
                </>
            )
            }
        </>
    )
}

export default Character;